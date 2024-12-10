import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "./Graph.css"

const Graph = ({ nodes, edges, currentPath, isRunning, algorithmSteps, currentStep }) => {
    const d3Container = useRef(null);
    const simulation = useRef(null);

    useEffect(() => {
        if (!nodes || nodes.length === 0) return;

        d3.select(d3Container.current).selectAll("*").remove();

        const width = d3Container.current.clientWidth;
        const height = d3Container.current.clientHeight;
        const svg = d3.select(d3Container.current)
            .attr("width", width)
            .attr("height", height);

        const nodesData = nodes.map(node => ({ ...node }));
        const linksData = edges.map(edge => ({
            source: nodesData.find(n => n.id === edge.source) || edge.source,
            target: nodesData.find(n => n.id === edge.target) || edge.target,
            weight: edge.weight
        }));

        simulation.current = d3.forceSimulation(nodesData)
            .force("link", d3.forceLink(linksData)
                .id(d => d.id)
                .distance(100))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(30));

        const link = svg.append("g")
            .selectAll("line")
            .data(linksData)
            .enter()
            .append("line")
            .attr("class", d => {
                if (!isRunning) return "link";
                const isInCurrentPath = currentPath.some(path =>
                    path.some((node, i) => {
                        if (i === path.length - 1) return false;
                        const nextNode = path[i + 1];
                        return (node === d.source.id && nextNode === d.target.id) ||
                            (node === d.target.id && nextNode === d.source.id);
                    })
                );
                return isInCurrentPath ? "link in-path" : "link";
            });

        const linkLabels = svg.append("g")
            .selectAll("text")
            .data(linksData)
            .enter()
            .append("text")
            .attr("class", "link-weight")
            .text(d => d.weight);

        const nodeGroup = svg.append("g")
            .selectAll("g")
            .data(nodesData)
            .enter()
            .append("g")
            .attr("class", d => {
                if (!isRunning) return "node unvisited";
                const isInPath = currentPath.some(path => path.includes(d.id));
                const step = algorithmSteps[currentStep];
                if (step?.current === d.id) {
                    return "node processing";
                }
                return isInPath ? "node in-path" : "node unvisited";
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        nodeGroup.append("circle")
            .attr("r", 20)
            .attr("class", "node-circle");

        nodeGroup.append("text")
            .text(d => d.id)
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .attr("fill", "white")
            .style("font-weight", "bold");

        function dragstarted(event, d) {
            if (!event.active) simulation.current.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            const x = Math.max(30, Math.min(width - 30, event.x));
            const y = Math.max(30, Math.min(height - 30, event.y));
            d.fx = x;
            d.fy = y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.current.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        simulation.current.on("tick", () => {
            nodesData.forEach(node => {
                node.x = Math.max(30, Math.min(width - 30, node.x));
                node.y = Math.max(30, Math.min(height - 30, node.y));
            });

            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y)
                .attr("class", d => {
                    if (!isRunning) return "link";
                    const isInCurrentPath = currentPath.some(path =>
                        path.some((node, i) => {
                            if (i === path.length - 1) return false;
                            const nextNode = path[i + 1];
                            return (node === d.source.id && nextNode === d.target.id) ||
                                (node === d.target.id && nextNode === d.source.id);
                        })
                    );
                    return isInCurrentPath ? "link in-path" : "link";
                });

            nodeGroup
                .attr("transform", d => `translate(${d.x},${d.y})`);

            linkLabels
                .attr("x", d => (d.source.x + d.target.x) / 2)
                .attr("y", d => (d.source.y + d.target.y) / 2 - 5)
                .attr("class", d => {
                    if (!isRunning) return "link-weight";
                    const isInCurrentPath = currentPath.some(path =>
                        path.some((node, i) => {
                            if (i === path.length - 1) return false;
                            const nextNode = path[i + 1];
                            return (node === d.source.id && nextNode === d.target.id) ||
                                (node === d.target.id && nextNode === d.source.id);
                        })
                    );
                    return isInCurrentPath ? "link-weight in-path" : "link-weight";
                });
        });

        return () => {
            simulation.current.stop();
        };
    }, [nodes, edges, currentPath, isRunning, algorithmSteps, currentStep]);

    return (
        <div className="graph-visualization">
            <svg ref={d3Container}></svg>
        </div>
    );
};

export default React.memo(Graph); 