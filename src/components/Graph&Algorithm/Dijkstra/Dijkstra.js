export const dijkstra = (nodes, edges, start) => {
    const steps = [];
    const distances = {};
    const previous = {};
    const unvisited = new Set(nodes.map(node => node.id));
    const visited = new Set();

    nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
    });
    distances[start] = 0;

    steps.push({
        distances: { ...distances },
        previous: { ...previous },
        current: start,
        visited: new Set(visited),
        message: `Initialization: distance to ${start} = 0`
    });

    while (unvisited.size > 0) {
        let current = null;
        let minDistance = Infinity;

        for (let nodeId of unvisited) {
            if (distances[nodeId] < minDistance) {
                minDistance = distances[nodeId];
                current = nodeId;
            }
        }

        if (current === null || distances[current] === Infinity) {
            steps.push({
                distances: { ...distances },
                previous: { ...previous },
                current: null,
                visited: new Set(visited),
                message: `The algorithm is complete. Unreachable peaks remain.`
            });
            break;
        }

        unvisited.delete(current);
        visited.add(current);

        steps.push({
            distances: { ...distances },
            previous: { ...previous },
            current: current,
            visited: new Set(visited),
            message: `Processing the top ${current}`
        });

        edges.forEach(edge => {
            const sourceId = edge.source;
            const targetId = edge.target;

            let neighbor = null;
            if (sourceId === current) {
                neighbor = targetId;
            } else if (targetId === current) {
                neighbor = sourceId;
            } else {
                return;
            }

            if (visited.has(neighbor)) return;

            const totalDistance = distances[current] + parseInt(edge.weight);

            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;
                previous[neighbor] = current;

                steps.push({
                    distances: { ...distances },
                    previous: { ...previous },
                    current: current,
                    visited: new Set(visited),
                    message: `Update distance to ${neighbor} via ${current}: ${totalDistance}`
                });
            }
        });
    }

    steps.push({
        distances: { ...distances },
        previous: { ...previous },
        current: null,
        visited: new Set(visited),
        message: `The algorithm is complete. The shortest paths to all reachable vertices have been found.`
    });

    return { steps };
};

export const buildAllPaths = (previous, start, distances) => {
    const paths = [];
    Object.keys(distances).forEach(nodeId => {
        if (nodeId !== start && distances[nodeId] !== Infinity) {
            const path = [];
            let current = nodeId;
            while (current !== null) {
                path.unshift(current);
                current = previous[current];
            }
            paths.push({
                target: nodeId,
                path: path,
                cost: distances[nodeId]
            });
        }
    });
    return paths;
};