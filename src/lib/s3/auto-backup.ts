import { invoke } from "@tauri-apps/api/core";
import {
  getS3Settings,
  saveS3Settings,
  type UpsertS3Settings,
} from "$lib/db/settings";
import { uploadFile } from "$lib/s3/client";
import { createLogger } from "$lib/logger";

const log = createLogger("auto-backup");
const INTERVAL_MS = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 5 * 60 * 1000;
let timerId: ReturnType<typeof setInterval> | null = null;

export function startAutoBackupScheduler(): void {
  if (timerId) return;
  checkAndBackup();
  timerId = setInterval(checkAndBackup, CHECK_INTERVAL_MS);
}

export function stopAutoBackupScheduler(): void {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

async function checkAndBackup(): Promise<void> {
  try {
    const s3 = await getS3Settings();
    if (!s3.enabled || !s3.auto_backup_enabled) return;

    const last = s3.last_auto_backup_at
      ? new Date(s3.last_auto_backup_at).getTime()
      : 0;
    if (Date.now() - last < INTERVAL_MS) return;

    await performBackup(s3);
  } catch (e) {
    log.error("Auto-backup failed", e);
  }
}

export async function performBackup(s3?: UpsertS3Settings): Promise<void> {
  log.info("Starting backup");
  const settings = s3 ?? (await getS3Settings());
  const { bytes } = await invoke<{ file_name: string; bytes: number[] }>(
    "backup_database",
  );

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const backupFileName = `bookie-${timestamp}.db`;

  await uploadFile(
    settings,
    `${settings.path_prefix}/backups`,
    backupFileName,
    new Uint8Array(bytes),
    "application/octet-stream",
  );

  await saveS3Settings({
    ...settings,
    last_auto_backup_at: new Date().toISOString(),
  });
}
