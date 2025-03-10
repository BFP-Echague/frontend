import { type ClusteringSettings, type FinalResult } from "@dbm/index";
import { FullResponse, headers } from "./base";
import { getBackendURL } from "./url";




export function getClusteringURL() {
    return getBackendURL("/cluster");
}

export async function performClustering(clusteringRequest: ClusteringSettings) {
    const result = await fetch(getClusteringURL(), {
        method: "POST",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(clusteringRequest)
    });

    return new FullResponse<FinalResult>(result);
}