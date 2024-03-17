function calculateRoofMeasurements() {
    const wholeRise = parseInt(document.getElementById('wholeRise').value);
    const fractionalRise = parseFraction(document.getElementById('fractionalRise').value);
    const wholeWallLength = parseInt(document.getElementById('wholeWallLength').value);
    const fractionalWallLength = parseFraction(document.getElementById('wholeWallLengthFractions').value);
    const numberOfOpenings = parseInt(document.getElementById('numberOfOpenings').value);

    if (isNaN(wholeRise) || isNaN(fractionalRise) || isNaN(wholeWallLength) || isNaN(fractionalWallLength) || isNaN(numberOfOpenings)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    const rise = wholeRise + fractionalRise;
    const wallLength = wholeWallLength + fractionalWallLength;

    const centerPieceLength = wallLength / numberOfOpenings;
    const adjustedCenterPieceLength = centerPieceLength - 1; // Subtracting 1 inch for up/down beam calculation

    const run = adjustedCenterPieceLength; // Use adjusted length for run in beam length calculation
    const pitchAngleRadians = Math.atan(rise / run);
    const pitchAngleDegrees = pitchAngleRadians * (180 / Math.PI);

    const beamLength = rise / Math.sin(pitchAngleRadians);

    // Display the original center piece length to the user
    document.getElementById('centerPieceLengthResult').textContent = decimalToMixedFraction(centerPieceLength) + ` + 2in perlings`;
    document.getElementById('pitchAngleResult').textContent = pitchAngleDegrees.toFixed(2) + ' degrees';
    document.getElementById('beamLengthResult').textContent = decimalToMixedFraction(beamLength);
    document.getElementById('angleTopResult').textContent = pitchAngleDegrees.toFixed(2) / 2;
    document.getElementById('angleResult').textContent = pitchAngleDegrees.toFixed(2);



    document.getElementById('results').style.display = 'block';
}


// Ensure this function accurately converts decimals to mixed fractions
function decimalToMixedFraction(decimal) {
    const wholePart = Math.floor(decimal);
    const fractionalPart = decimal - wholePart;
    let numerator = Math.round(fractionalPart * 16); // 16 as common fraction base
    let denominator = 16;

    if (numerator === denominator) {
        numerator = 0;
        denominator = 1;
        wholePart += 1;
    } else {
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const commonDivisor = gcd(numerator, denominator);
        numerator /= commonDivisor;
        denominator /= commonDivisor;
    }

    return numerator > 0 ? `${wholePart} ${numerator}/${denominator}` : `${wholePart}`;
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
