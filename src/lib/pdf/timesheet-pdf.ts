import { translations } from '$lib/i18n';

export type TimeSheetPdfGroupEntry = {
	entryDate: string;
	description: string;
	durationLabel: string;
};

export type TimeSheetPdfGroup = {
	customerName: string;
	periodLabel: string;
	totalLabel: string;
	entries: TimeSheetPdfGroupEntry[];
};

export type TimeSheetPdfData = {
	createdAtLabel: string;
	filtersLabel: string;
	totalHoursLabel: string;
	groups: TimeSheetPdfGroup[];
};

const escapeHtml = (value: string): string =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

export function generateTimeSheetHtml(data: TimeSheetPdfData): string {
	const tr = translations().pdf;

	const groupsHtml = data.groups
		.map(
			(group) => `
			<section class="group">
				<header>
					<h2>${escapeHtml(group.customerName)}</h2>
					<p>${escapeHtml(group.periodLabel)} · ${tr.timesheetSum}: ${escapeHtml(group.totalLabel)}</p>
				</header>
				<table>
					<thead>
						<tr><th>${escapeHtml(tr.timesheetDate)}</th><th>${escapeHtml(tr.timesheetDescription)}</th><th>${escapeHtml(tr.timesheetDuration)}</th></tr>
					</thead>
					<tbody>
						${group.entries
							.map(
								(entry) => `
							<tr>
								<td>${escapeHtml(entry.entryDate)}</td>
								<td>${escapeHtml(entry.description || '—')}</td>
								<td>${escapeHtml(entry.durationLabel)}</td>
							</tr>`
							)
							.join('')}
					</tbody>
				</table>
			</section>`
		)
		.join('');

	return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(tr.timesheetTitle)}</title>
<style>
body { font-family: Inter, Arial, sans-serif; margin: 20px; color: #111827; }
h1 { margin: 0 0 4px; font-size: 22px; }
.meta { color: #4b5563; font-size: 12px; margin-bottom: 18px; }
.group { margin-bottom: 16px; border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; }
.group header { padding: 10px 12px; background: #f3f4f6; }
.group h2 { margin: 0; font-size: 15px; }
.group p { margin: 3px 0 0; font-size: 12px; color: #4b5563; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 8px 10px; border-top: 1px solid #e5e7eb; font-size: 12px; }
th { background: #f9fafb; font-size: 11px; text-transform: uppercase; color: #4b5563; letter-spacing: .03em; }
@media print { body { margin: 10mm; } .group { break-inside: avoid; } }
</style>
</head>
<body>
	<h1>${escapeHtml(tr.timesheetTitle)}</h1>
	<div class="meta">${escapeHtml(tr.timesheetCreated)}: ${escapeHtml(data.createdAtLabel)}<br/>${escapeHtml(tr.timesheetFilter)}: ${escapeHtml(data.filtersLabel)}<br/>${escapeHtml(tr.timesheetTotalDuration)}: ${escapeHtml(data.totalHoursLabel)}</div>
	${groupsHtml || `<p>${escapeHtml(tr.timesheetNoEntries)}</p>`}
</body>
</html>`;
}
