function embedChart(containerId, specUrl) {
    const loader = vega.loader({ target: '_blank' });
    const customLoader = vega.loader();
    customLoader.load = async (uri) => {
        const response = await fetch(uri);
        if (!response.ok) throw new Error(`HTTP ${response.status} for ${uri}`);
        return response.text();
    };

    vegaEmbed(`#${containerId}`, specUrl, {
        mode: 'vega-lite',
        loader: customLoader,
        actions: false,
        renderer: 'canvas',
        config: {
            background: 'transparent',
            axis: {
                labelColor: '#ffffff',
                titleColor: '#ffffff',
                gridColor: '#444444',
                domainColor: '#888888',
                tickColor: '#888888'
            },
            legend: {
                labelColor: '#ffffff',
                titleColor: '#ffffff'
            },
            title: {
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 'normal'
            }
        }
    }).catch(error => console.error(`Error embedding ${containerId}:`, error));
}

const majorEvents = [
    { year: 2011, description: 'Arab Spring' },
    { year: 2011, description: 'Eurozone crisis deepens' },
    { year: 2011, description: 'Osama bin Laden killed' },
    { year: 2011, description: 'South Sudan independence' },
    
    { year: 2012, description: 'Global economic slowdown' },
    { year: 2012, description: 'London Olympics' },
    { year: 2012, description: 'Higgs boson discovered' },
    
    { year: 2013, description: 'Edward Snowden revelations' },
    { year: 2013, description: 'Pope Francis elected' },
    
    { year: 2014, description: 'Ebola outbreak in West Africa' },
    { year: 2014, description: 'Russia annexes Crimea' },
    { year: 2014, description: 'MH17 shot down over Ukraine' },
    
    { year: 2015, description: 'European refugee crisis peaks' },
    { year: 2015, description: 'Paris Agreement adopted' },
    { year: 2015, description: 'US same‑sex marriage legalised' },
    
    { year: 2016, description: 'Brexit vote' },
    { year: 2016, description: 'Trump elected' },
    { year: 2016, description: 'Rio Olympics' },
    { year: 2016, description: 'Zika virus outbreak' },
    
    { year: 2017, description: 'Trump inauguration' },
    { year: 2017, description: 'Rohingya crisis in Myanmar' },
    
    { year: 2018, description: 'US–North Korea summit' },
    { year: 2018, description: 'Thai cave rescue' },
    
    { year: 2019, description: 'Global climate strikes' },
    { year: 2019, description: 'Notre‑Dame fire' },
    { year: 2019, description: 'Hong Kong protests' },
    
    { year: 2020, description: 'COVID-19 pandemic begins' },
    { year: 2020, description: 'George Floyd protests' },
    { year: 2020, description: 'Brexit transition ends' },
    
    { year: 2021, description: 'Vaccine rollouts / Delta variant' },
    { year: 2021, description: 'Taliban takeover of Afghanistan' },
    { year: 2021, description: 'COP26 climate summit' },
    
    { year: 2022, description: 'Russia invades Ukraine' },
    { year: 2022, description: "Queen Elizabeth II's death" },
    { year: 2022, description: 'FIFA World Cup in Qatar' },
    { year: 2022, description: 'US Supreme Court overturns Roe v. Wade' },
    
    { year: 2023, description: 'Israel–Hamas war' },
    { year: 2023, description: 'India lands on Moon (Chandrayaan‑3)' },
    { year: 2023, description: 'Record global heat' },
    
    { year: 2024, description: 'Trump re‑elected' },
    { year: 2024, description: 'Paris Olympics' },
    { year: 2024, description: 'Ongoing Ukraine / Middle East conflicts' },
    
    { year: 2025, description: 'Geopolitical tensions continue' },
    { year: 2025, description: 'AI governance debates' }
];

/**
 * Initialize the year dropdown and bullet‑point event list.
 * @param {Array} events - Array of {year, description} objects.
 */
function initYearSelector(events) {
    const yearSelect = document.getElementById('year-select');
    const eventsList = document.getElementById('events-list');
    if (!yearSelect || !eventsList) return;

    // Get unique years, sorted ascending
    const years = [...new Set(events.map(e => e.year))].sort((a, b) => a - b);

    // Populate dropdown
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Function to display events for a given year
    function displayEventsForYear(year) {
        const filtered = events.filter(e => e.year === year);
        eventsList.innerHTML = '';
        if (filtered.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No events recorded for this year.';
            li.className = 'event-item';
            eventsList.appendChild(li);
            return;
        }
        filtered.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event.description;
            li.className = 'event-item';
            eventsList.appendChild(li);
        });
    }

    // Show events for the first year initially
    if (years.length) {
        yearSelect.value = years[0];
        displayEventsForYear(years[0]);
    }

    // Update when dropdown changes
    yearSelect.addEventListener('change', (e) => {
        displayEventsForYear(parseInt(e.target.value, 10));
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initYearSelector(majorEvents);   // replaces the old renderTimeline

    embedChart('chart-top20', 'top20_chart.json');
    embedChart('chart-bottom20', 'bottom20_chart.json');
    embedChart('chart-scatter', 'scatter_highlight.json');
    embedChart('chart-line', 'line_chart.json');
    embedChart('chart-factor', 'factor_contributions.json');
});