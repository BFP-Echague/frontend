<script lang="ts">
	import { CategoryAPIRoute, formatGraphMonthDate, IncidentAPIRoute, type CategoryGet, type IncidentGet } from "$lib";
	import DisplayItem from "$lib/components/display/displayItem.svelte";
	import { generateRandomHexColor } from "$lib/randomColor";
    import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle } from "@sveltestrap/sveltestrap";
    import Chart, { type ChartOptions } from "chart.js/auto";
    import { onMount } from "svelte";


    let incidents: IncidentGet[] | null = $state(null);
    let categories: CategoryGet[] | null = $state(null);


    let monthlyIncidentsCanvas: HTMLCanvasElement | null = null;
    let noMonthIncidentCount: number | null = $state(null);

    let causesCanvas: HTMLCanvasElement | null = null;
    let heatmapCanvas: HTMLCanvasElement | null = null;


    let chartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    }


    $effect(() => {
        const incidentsDerived = incidents;
        if (incidentsDerived === null) return;

        const categoriesDerived = categories;
        if (categoriesDerived === null) return;



        if (monthlyIncidentsCanvas == null) return;

        const noMonthIncidents: IncidentGet[] = [];
        const monthlyIncidents: { month: number; year: number; incidentCount: number }[] = [];
        for (const incident of incidentsDerived) {
            if (incident.reportTime === null) {
                noMonthIncidents.push(incident);
                continue;
            }

            const reportTime = incident.reportTime;

            const monthlyIncidentReport = monthlyIncidents.find(
                monthlyIncident => 
                    monthlyIncident.month === reportTime.getMonth() &&
                    monthlyIncident.year === reportTime.getFullYear()
            );
            if (monthlyIncidentReport !== undefined) {
                monthlyIncidentReport.incidentCount++;
            } else {
                monthlyIncidents.push({
                    month: reportTime.getMonth(),
                    year: reportTime.getFullYear(),
                    incidentCount: 1
                })
            }
        }
        monthlyIncidents.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            else return a.month - b.month;
        })

        noMonthIncidentCount = noMonthIncidents.length
        new Chart(monthlyIncidentsCanvas, {
            type: "bar",
            data: {
                labels: monthlyIncidents.map(x => formatGraphMonthDate(new Date(x.year, x.month))),
                datasets: [{
                    label: "Monthly Fire Incidents",
                    data: monthlyIncidents.map(x => x.incidentCount),
                    backgroundColor: "rgba(183, 28, 28, 0.7)"
                }]
            },
            options: chartOptions
        });



        if (causesCanvas == null) return;

        const unknownCause = "unknown";
        const causeCounts: { cause: string; count: number; }[] = [{ cause: unknownCause, count: 0 }]
        for (const incident of incidentsDerived) {
            if (incident.causes.length === 0) {
                const causeCount = causeCounts.find(x => x.cause === unknownCause)
                if (causeCount === undefined) throw new Error("unknown cause not found. this should be impossible...");
                causeCount.count++;
            }

            for (const cause of incident.causes) {
                const causeCount = causeCounts.find(x => x.cause === cause);
                if (causeCount === undefined) {
                    causeCounts.push({
                        cause,
                        count: 1
                    });
                } else {
                    causeCount.count++;
                }
            }
        }
        causeCounts.sort((a, b) => {
            if (a.cause === unknownCause) return -1;
            if (b.cause === unknownCause) return 1;
            return a.cause.localeCompare(b.cause);
        })

        new Chart(causesCanvas, {
            type: "pie",
            data: {
                labels: causeCounts.map(x => x.cause),
                datasets: [{
                    data: causeCounts.map(x => x.count),
                    backgroundColor: causeCounts.map(x => {
                        if (x.cause === unknownCause) return "#999999";
                        return generateRandomHexColor();
                    })
                }]
            },
            options: chartOptions
        });



        if (heatmapCanvas == null) return;


        const locationInfos: { categoryId: number; categoryName: string; color: string; locations: { x: number; y: number; }[] }[] = []
        for (const incident of incidentsDerived) {
            let locationInfo = locationInfos.find(x => x.categoryId === incident.category.id);
            if (locationInfo === undefined) {
                locationInfos.push({
                    categoryId: incident.category.id,
                    categoryName: incident.category.name,
                    color: generateRandomHexColor(),
                    locations: [{
                        x: incident.location.latitude.toNumber(),
                        y: incident.location.longitude.toNumber()
                    }]
                });
            } else {
                locationInfo.locations.push({
                    x: incident.location.latitude.toNumber(),
                    y: incident.location.longitude.toNumber()
                });
            }
        }

        console.log(locationInfos)

        new Chart(heatmapCanvas, {
            type: "scatter",
            data: {
                datasets: locationInfos.map(x => ({
                    label: x.categoryName,
                    data: x.locations,
                    backgroundColor: x.color
                }))
            },
            options: {
                ...chartOptions,
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom"
                    }
                }
            }
        });
    })



    onMount(async () => {
        const incidentResult = await IncidentAPIRoute.instance.getMany(new URLSearchParams({ pageSize: "100" }));
		if (!incidentResult.isOK()) {
			alert("Failed to load incidents");
			return;
		}

		const moreInfoIncident = await incidentResult.getMoreInfoParsed();
        incidents = moreInfoIncident.data;


        const categoryResult = await CategoryAPIRoute.instance.getMany();
		if (!categoryResult.isOK()) {
			alert("Failed to load categories");
			return;
		}

		const moreInfoCategory = await categoryResult.getMoreInfoParsed();
        categories = moreInfoCategory;
    });
</script>

<style>
    .chart-container {
        position: relative;
        height: 50vh;
        width: 100%;
    }
</style>


<div class="d-flex flex-column mt-3 p-5 w-100 h-100">
    <div class="d-flex flex-column">
        <h1 class="text-primary text-center">Summary Statistics</h1>
    </div>

    <div class="d-flex flex-column w-100">
        <div class="d-flex w-100">
            <Card class="w-100 shadow border">
                <CardBody>
                    <h5>Heatmap of Fire Incidents</h5>
                    <div class="chart-container">
                        <canvas bind:this={heatmapCanvas}></canvas>
                    </div>
                </CardBody>
            </Card>
        </div>

        <div class="d-flex w-100 mt-5">
            <Card class="w-100 shadow border">
                <CardBody>
                    <h5>Fire Causes Distribution</h5>
                    <div class="chart-container">
                        <canvas bind:this={causesCanvas}></canvas>
                    </div>
                </CardBody>
            </Card>
        </div>

        <div class="d-flex w-100 mt-5">
            <Card class="w-100 shadow border">
                <CardHeader>
                    <CardTitle>Monthly Fire Incidents</CardTitle>
                </CardHeader>
                <CardBody>
                    <div class="chart-container">
                        <canvas bind:this={monthlyIncidentsCanvas}></canvas>
                    </div>

                    <DisplayItem name="Incidents without report time" description={noMonthIncidentCount} />
                </CardBody>
            </Card>
        </div>
    </div>
</div>