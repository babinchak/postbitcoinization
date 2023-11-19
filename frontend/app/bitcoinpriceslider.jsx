import Slider from '@mui/material/Slider';

function ExponentialSlider({ value, onChange }) {
    const maxValue = 100000000;

    // Function to calculate the exponential value
    function calculateExponentialValue(x) {
        const a = 100;
        const b = 1000000;
        const normalizedX = x / 100; // Normalize x to a 0-1 scale
        return a * (b ** normalizedX);
    }

    // Function to calculate the slider's position from the value
    function calculateSliderPosition(y) {
        if (y <= 0) return 0; // To handle edge case
        return 100 * Math.log(y / 100) / Math.log(1000000);
    }

    // Handler for slider change
    const handleSliderChange = (event) => {
        const newValue = calculateExponentialValue(event.target.value);
        onChange(newValue); // Call the passed onChange function
    };

    const marks = [
        {
            value: 0,
            label: '$100',
        },
        {
            value: 16.667,
            label: '$1,000',
        },
        {
            value: 33.333,
            label: '$10,000',
        },
        {
            value: 50,
            label: '$100,000',
        },
        {
            value: 66.667,
            label: '$1,000,000',
        },
        {
            value: 83.333,
            label: '$10,000,000',
        },
        {
            value: 100,
            label: '$100,000,000',
        },
    ]

    return (
        <div>
            <Slider
                min={0}
                max={100}
                step={0.1}
                value={calculateSliderPosition(value)}
                onChange={handleSliderChange}
                valueLabelDisplay="off"
                aria-labelledby="non-linear-slider"
                marks={marks}
                color="warning"
            />
            {/* <p>Slider Value: ${Math.round(value).toLocaleString('en-US')}</p> */}
        </div>
    );
}

export default ExponentialSlider;