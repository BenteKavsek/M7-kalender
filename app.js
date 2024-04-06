let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function CalendartableHeader(date, Disabled, Selected) {
    this.date = date;
    this.Disabled = Disabled;
    this.Selected = Selected;
}

function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay() - 1;

    const calendar = document.getElementById("calendar");
    
    calendar.innerHTML = "";

    let date = 1;


    const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

    const tableRow = document.createElement("tr");
    weekDays.forEach(day => {
        const tableHeader = document.createElement("th");
        tableHeader.textContent = day;
        tableRow.appendChild(tableHeader);
    });
    
    calendar.appendChild(tableRow);

    for (let i = 0; i < 6; i++) {
        const tableRow = document.createElement("tr");

        for (let weekdays = 0; weekdays < 7; weekdays++) {
            let tableHeader;
            if (i === 0 && weekdays < firstDay) {
                const prevMonthDays = new Date(year, month, -weekdays).getDate();
                tableHeader = new CalendartableHeader(prevMonthDays - firstDay + weekdays + 1, true, false);
            }

            else if (date > daysInMonth) {
                tableHeader = new CalendartableHeader(date - daysInMonth, true, false);
                date++;
            }
            
            else {
                tableHeader = new CalendartableHeader(date, false, (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()));
                date++;
            }

            const tableHeaderElement = document.createElement("td");
            tableHeaderElement.textContent = tableHeader.date;

            if (tableHeader.Disabled){
                tableHeaderElement.classList.add("disabled");
            }

            if (tableHeader.Selected){
                tableHeaderElement.classList.add("selected");
            }

            tableRow.appendChild(tableHeaderElement);
        }

        calendar.appendChild(tableRow);
    }

    const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    document.getElementById('currentMonth').textContent = months[currentMonth];
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);
