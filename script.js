function calculatePitch() {
    const wholeRise = parseInt(document.getElementById('wholeRise').value);
    const fractionalRise = parseFraction(document.getElementById('fractionalRise').value);
    const wholeRun = parseInt(document.getElementById('wholeRun').value);
    const fractionalRun = parseFraction(document.getElementById('fractionalRun').value);

    if (isNaN(wholeRise) || isNaN(fractionalRise) || isNaN(wholeRun) || isNaN(fractionalRun)) {
        alert('Please enter valid numbers for Rise and Run.');
        return;
    }

    const rise = wholeRise + fractionalRise / 16; // Convert fractional part to decimal (assuming 16ths)
    const run = wholeRun + fractionalRun / 16; // Convert fractional part to decimal (assuming 16ths)

    const pitch = `${Math.floor(rise)} ${rise % 1 ? `${Math.round((rise % 1) * 16)}/16` : ''}`;
    const angle = (Math.atan(rise / run) * (180 / Math.PI)).toFixed(2);

    // Convert beamLength to mixed fraction
    const beamLengthDecimal = Math.sqrt(rise * rise + run * run).toFixed(2);
    const beamLengthMixedFraction = decimalToMixedFraction(parseFloat(beamLengthDecimal));

    document.getElementById('pitchResult').textContent = pitch;
    document.getElementById('angleResult').textContent = angle;
    document.getElementById('angleTopResult').textContent = angle/2;

    document.getElementById('beamLengthResult').textContent = beamLengthMixedFraction;

    document.getElementById('results').style.display = 'block';
}

function parseFraction(fractionString) {
    const parts = fractionString.split('/');
    if (parts.length === 2) {
        const numerator = parseInt(parts[0]);
        const denominator = parseInt(parts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
        }
    }
    return 0;
}

function decimalToMixedFraction(decimal) {
    const wholePart = Math.floor(decimal);
    const decimalPart = decimal - wholePart;
    const tolerance = 1e-10; 

    let numerator = Math.round(decimalPart * 16); 
    let denominator = 16;

    
    const gcd = (a, b) => (b < tolerance ? a : gcd(b, a % b));
    const commonDivisor = gcd(numerator, denominator);

    numerator /= commonDivisor;
    denominator /= commonDivisor;

    return `${wholePart} ${numerator}/${denominator}`;
}
