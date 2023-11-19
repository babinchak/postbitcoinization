import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const HorizontalBar = ({ leftPercentage }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 500;
        const height = 50;

        const leftWidth = width * leftPercentage / 100;
        const rightWidth = width * (100 - leftPercentage) / 100;

        svg.selectAll('rect').remove();

        svg.append('rect')
            .attr('width', leftWidth)
            .attr('height', height)
            .attr('fill', 'blue');

        svg.append('rect')
            .attr('x', leftWidth)
            .attr('width', rightWidth)
            .attr('height', height)
            .attr('fill', 'green');
    }, [leftPercentage]);

    return <svg ref={ref} width="500" height="50" className="rounded-lg mt-4" />;
};

export default HorizontalBar;