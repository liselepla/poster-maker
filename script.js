// === EXPORT SETUP ===
// Zorg dat fonts geladen zijn voor de export
document.fonts.ready.then(function () {
  console.log('Fonts geladen');
});
const EXPORT_WIDTH = Math.round(51.1 / 2.54 * 300);  // 6035 px
const EXPORT_HEIGHT = Math.round(76.1 / 2.54 * 300); // 8988 px
let IS_EXPORTING = false;

function getCanvasMetrics() {
  if (IS_EXPORTING) {
    return {
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
      scale: EXPORT_WIDTH / 600
    };
  }
  return {
    width: 600,
    height: 894,
    scale: 1
  };
}


const canvasWrapper = document.getElementById('canvasWrapper');
const canvas = document.getElementById('canvas');
const lineOverlay = document.getElementById('lineOverlay');
const ctx = lineOverlay.getContext('2d');
const shape = document.getElementById('shape');
const textBox1 = document.getElementById('textBox1');
const textBox1Canvas = document.getElementById('textBox1Canvas');
const ctxBox1 = textBox1Canvas.getContext('2d');
const textBox2 = document.getElementById('textBox2');
const textBox2Canvas = document.getElementById('textBox2Canvas');
const ctxBox2 = textBox2Canvas.getContext('2d');
const decorativeStripes = document.getElementById('decorativeStripes');
const stripe1 = document.getElementById('stripe1');
const stripe2 = document.getElementById('stripe2');
const ctxStripe1 = stripe1.getContext('2d');
const ctxStripe2 = stripe2.getContext('2d');

const menuColor1 = document.getElementById('menuColor1');
const menuColor2 = document.getElementById('menuColor2');
const menuColor3 = document.getElementById('menuColor3');
const menuStrokeWidth = document.getElementById('menuStrokeWidth');
const menuFontSize = document.getElementById('menuFontSize');
const menuNumberInput = document.getElementById('menuNumberInput');
const menuPosX = document.getElementById('menuPosX');
const menuPosY = document.getElementById('menuPosY');
const menuCornerShift = document.getElementById('menuCornerShift');
const menuCorner4X = document.getElementById('menuCorner4X');
const menuCorner5Y = document.getElementById('menuCorner5Y');
const menuTrapText1 = document.getElementById('menuTrapText1');
const menuTrapText2 = document.getElementById('menuTrapText2');
const menuTrapWidth = document.getElementById('menuTrapWidth');
const menuTrapLength1 = document.getElementById('menuTrapLength1');
const menuTrapLength2 = document.getElementById('menuTrapLength2');
const menuTrap1TextPos = document.getElementById('menuTrap1TextPos');
const menuTrap2TextPos = document.getElementById('menuTrap2TextPos');
const menuTrapFontSize = document.getElementById('menuTrapFontSize');
const menuTrap1PosX = document.getElementById('menuTrap1PosX');
const menuTrap2PosX = document.getElementById('menuTrap2PosX');
const menuBox1Text = document.getElementById('menuBox1Text');
const menuBox1FontSize = document.getElementById('menuBox1FontSize');
const menuBox1Width = document.getElementById('menuBox1Width');
const menuBox1Height = document.getElementById('menuBox1Height');
const menuBox1TextX = document.getElementById('menuBox1TextX');
const menuBox1TextY = document.getElementById('menuBox1TextY');
const menuBox1Corner1Y = document.getElementById('menuBox1Corner1Y');
const menuBox1Corner2X = document.getElementById('menuBox1Corner2X');
const menuBoxGap = document.getElementById('menuBoxGap');
const menuBox2Text = document.getElementById('menuBox2Text');
const menuBox2FontSize = document.getElementById('menuBox2FontSize');
const menuBox2Width = document.getElementById('menuBox2Width');
const menuBox2Height = document.getElementById('menuBox2Height');
const menuBox2TextX = document.getElementById('menuBox2TextX');
const menuBox2TextY = document.getElementById('menuBox2TextY');
const menuBox2Corner1X = document.getElementById('menuBox2Corner1X');
const menuBox2Corner2Y = document.getElementById('menuBox2Corner2Y');
const menuTicketDate = document.getElementById('menuTicketDate');
const menuTicketLocation = document.getElementById('menuTicketLocation');
const menuTicketPrice = document.getElementById('menuTicketPrice');
const menuTicketOpening = document.getElementById('menuTicketOpening');
const menuTicketClosing = document.getElementById('menuTicketClosing');
const menuTicketInfoFontSize = document.getElementById('menuTicketInfoFontSize');
const menuTicketPriceFontSize = document.getElementById('menuTicketPriceFontSize');
const menuTicketHeight = document.getElementById('menuTicketHeight');
const menuTicketWidth = document.getElementById('menuTicketWidth');
const menuTicketPosX = document.getElementById('menuTicketPosX');
const menuTicketPosY = document.getElementById('menuTicketPosY');
const menuArtistText = document.getElementById('menuArtistText');
const menuArtistFontSize = document.getElementById('menuArtistFontSize');
const menuArtistWidth = document.getElementById('menuArtistWidth');
const menuArtistHeight = document.getElementById('menuArtistHeight');
const menuArtistPosX = document.getElementById('menuArtistPosX');
const menuArtistDistance = document.getElementById('menuArtistDistance');
const menuArtistCorner1X = document.getElementById('menuArtistCorner1X');
const menuArtistCorner2Y = document.getElementById('menuArtistCorner2Y');
const menuExtraInfoText = document.getElementById('menuExtraInfoText');
const menuExtraInfoFontSize = document.getElementById('menuExtraInfoFontSize');
const menuExtraInfoX = document.getElementById('menuExtraInfoX');
const menuExtraInfoDistance = document.getElementById('menuExtraInfoDistance');

// Text menu inputs
const menuNumberInputText = document.getElementById('menuNumberInputText');
const menuBox1TextInput = document.getElementById('menuBox1TextInput');
const menuBox2TextInput = document.getElementById('menuBox2TextInput');
const menuTrapText1Input = document.getElementById('menuTrapText1Input');
const menuTrapText2Input = document.getElementById('menuTrapText2Input');
const menuTicketDateInput = document.getElementById('menuTicketDateInput');
const menuTicketLocationInput = document.getElementById('menuTicketLocationInput');
const menuTicketPriceInput = document.getElementById('menuTicketPriceInput');
const menuTicketOpeningInput = document.getElementById('menuTicketOpeningInput');
const menuTicketClosingInput = document.getElementById('menuTicketClosingInput');
const menuExtraInfoTextInput = document.getElementById('menuExtraInfoTextInput');
const menuArtistTextInput = document.getElementById('menuArtistTextInput');

const ticketSection = document.getElementById('ticketSection');
const ticketBox = document.getElementById('ticketBox');
const ticketCenter = document.getElementById('ticketCenter');
const ticketDate = document.getElementById('ticketDate');
const ticketLocation = document.getElementById('ticketLocation');
const ticketOpening = document.getElementById('ticketOpening');
const ticketClosing = document.getElementById('ticketClosing');
const artistBox = document.getElementById('artistBox');
const artistCanvas = document.getElementById('artistCanvas');
const ctxArtist = artistCanvas.getContext('2d');
const extraInfo = document.getElementById('extraInfo');

let currentScale = 0.8;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragStartPanX = 0;
let dragStartPanY = 0;
let corners = null;

function updateExtraInfo() {
  const strokeColor = menuColor2.value;
  const fontSize = parseFloat(menuExtraInfoFontSize.value);
  const xPos = parseFloat(menuExtraInfoX.value);
  const distance = parseFloat(menuExtraInfoDistance.value);
  
  const canvasHeight = 894;
  
  // Bereken Y positie op basis van ticket kader positie + afstand
  const ticketPosY = parseFloat(menuTicketPosY.value);
  const ticketHeight = parseFloat(menuTicketHeight.value);
  const ticketHeightPercent = (ticketHeight / canvasHeight) * 100;
  
  // Y positie = ticket Y positie + helft van ticket hoogte + afstand
  const yPos = ticketPosY + (ticketHeightPercent / 2) + distance;
  
  extraInfo.textContent = menuExtraInfoTextInput.value;
  extraInfo.style.fontSize = fontSize + 'px';
  extraInfo.style.color = strokeColor;
  extraInfo.style.left = xPos + '%';
  extraInfo.style.top = yPos + '%';
  
  // Update artist box zodat het mee beweegt
  updateArtistBox();
}

function updateTicketSection() {
  const accentColor = menuColor3.value;
  const strokeColor = menuColor2.value;
  const strokeWidth = parseFloat(menuStrokeWidth.value);
  const ticketHeight = parseFloat(menuTicketHeight.value);
  const ticketWidth = parseFloat(menuTicketWidth.value);
  let ticketPosX = parseFloat(menuTicketPosX.value);
  let ticketPosY = parseFloat(menuTicketPosY.value);
  const infoFontSizeSlider = parseFloat(menuTicketInfoFontSize.value);
  const priceFontSizeSlider = parseFloat(menuTicketPriceFontSize.value);
  
  // Beperk Y positie tot onderste helft (50% - 100%)
  ticketPosY = Math.max(50, Math.min(ticketPosY, 100));
  
  // Update slider waarde als het buiten bereik was
  if (menuTicketPosY.value != ticketPosY) {
    menuTicketPosY.value = ticketPosY;
  }
  
  ticketDate.textContent = menuTicketDateInput.value;
  ticketLocation.textContent = menuTicketLocationInput.value;
  ticketCenter.textContent = menuTicketPriceInput.value;
  ticketOpening.textContent = menuTicketOpeningInput.value;
  ticketClosing.textContent = menuTicketClosingInput.value;
  
  // Bereken maximale tekstgrootte op basis van kaderhoogte
  // Voor info tekst: max 40% van de kaderhoogte (er zijn 2 regels per kolom)
  const maxInfoFontSize = ticketHeight * 0.4;
  // Voor prijs: max 50% van de kaderhoogte (cirkel is even hoog als kader)
  const maxPriceFontSize = ticketHeight * 0.5;
  
  // Gebruik de kleinste van slider waarde of maximum
  const infoFontSize = Math.min(infoFontSizeSlider, maxInfoFontSize);
  const priceFontSize = Math.min(priceFontSizeSlider, maxPriceFontSize);
  
  // Stel tekstgroottes in
  ticketDate.style.fontSize = infoFontSize + 'px';
  ticketLocation.style.fontSize = infoFontSize + 'px';
  ticketOpening.style.fontSize = infoFontSize + 'px';
  ticketClosing.style.fontSize = infoFontSize + 'px';
  ticketCenter.style.fontSize = priceFontSize + 'px';
  
  // Stel tekstkleur in op kleur 2 (strokeColor)
  ticketDate.style.color = strokeColor;
  ticketLocation.style.color = strokeColor;
  ticketOpening.style.color = strokeColor;
  ticketClosing.style.color = strokeColor;
  ticketCenter.style.color = strokeColor;
  
  // Stel breedte en positie van ticket section in
  ticketSection.style.width = ticketWidth + '%';
  ticketSection.style.left = ticketPosX + '%';
  ticketSection.style.top = ticketPosY + '%';
  
  // Stel hoogte van kader en cirkel in (cirkel = hoogte van kader)
  ticketBox.style.height = ticketHeight + 'px';
  ticketCenter.style.width = ticketHeight + 'px';
  ticketCenter.style.height = ticketHeight + 'px';
  
  // Update SVG achtergronden
  const ticketBoxBg = document.getElementById('ticketBoxBg');
  const ticketCircleBg = document.getElementById('ticketCircleBg');
  
  if (ticketBoxBg && ticketCircleBg) {
    // Bereken breedte in pixels
    const sectionWidth = (ticketWidth / 100) * 600; // Canvas is 600px breed
    
    ticketBoxBg.setAttribute('width', sectionWidth);
    ticketBoxBg.setAttribute('height', ticketHeight);
    ticketBoxBg.setAttribute('stroke', accentColor);
    ticketBoxBg.setAttribute('stroke-width', strokeWidth*2);
    
    const circleRadius = (ticketHeight / 2) - (strokeWidth / 2);
    ticketCircleBg.setAttribute('cx', sectionWidth / 2);
    ticketCircleBg.setAttribute('cy', ticketHeight / 2);
    ticketCircleBg.setAttribute('r', circleRadius);
    ticketCircleBg.setAttribute('stroke', accentColor);
    ticketCircleBg.setAttribute('stroke-width', strokeWidth);
  }
  
  ticketBox.style.borderWidth = '0px';
  ticketBox.style.borderColor = 'transparent';
  ticketCenter.style.borderWidth = '0px';
  ticketCenter.style.borderColor = 'transparent';
  
  // Update extraInfo grenzen na ticket height change
  updateExtraInfo();
}

function updateArtistBox() {
  const strokeColor = menuColor2.value;
  const strokeWidth = parseFloat(menuStrokeWidth.value);
  const artistWidth = parseFloat(menuArtistWidth.value);
  const artistHeight = parseFloat(menuArtistHeight.value);
  const artistFontSizeSlider = parseFloat(menuArtistFontSize.value);
  const artistPosX = parseFloat(menuArtistPosX.value);
  const artistDistance = parseFloat(menuArtistDistance.value);
  const corner1X = parseFloat(menuArtistCorner1X.value);
  const corner2Y = parseFloat(menuArtistCorner2Y.value);
  
  // Bereken maximale tekstgrootte op basis van kaderhoogte
  // Max 60% van de kaderhoogte (enkele regel tekst)
  const maxArtistFontSize = artistHeight * 0.6;
  
  // Gebruik de kleinste van slider waarde of maximum
  const artistFontSize = Math.min(artistFontSizeSlider, maxArtistFontSize);
  
  // Bereken Y positie op basis van extra info positie + afstand
  const canvasHeight = 894;
  const ticketPosY = parseFloat(menuTicketPosY.value);
  const ticketHeight = parseFloat(menuTicketHeight.value);
  const ticketHeightPercent = (ticketHeight / canvasHeight) * 100;
  const extraInfoDistance = parseFloat(menuExtraInfoDistance.value);
  
  // Extra info Y positie
  const extraInfoY = ticketPosY + (ticketHeightPercent / 2) + extraInfoDistance;
  
  // Artist Y positie = extra info Y + afstand
  const artistPosY = extraInfoY + artistDistance;
  
  artistBox.textContent = menuArtistTextInput.value;
  artistBox.style.width = artistWidth + 'px';
  artistBox.style.height = artistHeight + 'px';
  artistBox.style.fontSize = artistFontSize + 'px';
  artistBox.style.borderWidth = '0px'; // Geen border, alleen canvas contour
  artistBox.style.color = strokeColor;
  
  // Stel positie van artist section in
  const artistSection = document.getElementById('artistSection');
  artistSection.style.left = artistPosX + '%';
  artistSection.style.top = artistPosY + '%';
  
  // Clip-path: zelfde vorm als tekstkader 2 (vijfhoek met afgesneden linkeronderhoek)
  artistBox.style.clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, ${corner1X}% 100%, 0% ${corner2Y}%)`;
  
  // Update SVG clip path
  const artistBoxClipPath = document.getElementById('artistBoxClipPath');
  if (artistBoxClipPath) {
    const w = artistWidth;
    const h = artistHeight;
    const points = [
      `0,0`,
      `${w},0`,
      `${w},${h}`,
      `${corner1X/100*w},${h}`,
      `0,${corner2Y/100*h}`
    ].join(' ');
    artistBoxClipPath.setAttribute('points', points);
  }
  
  drawArtistContour();
}

function drawArtistContour() {
  const dpr = window.devicePixelRatio || 1;
  const w = artistBox.offsetWidth;
  const h = artistBox.offsetHeight;
  const stroke = parseFloat(menuStrokeWidth.value);
  const corner1X = parseFloat(menuArtistCorner1X.value) / 100;
  const corner2Y = parseFloat(menuArtistCorner2Y.value) / 100;
  
  const padding = stroke;
  artistCanvas.width = Math.round((w + padding * 2) * dpr);
  artistCanvas.height = Math.round((h + padding * 2) * dpr);
  artistCanvas.style.width = (w + padding * 2) + 'px';
  artistCanvas.style.height = (h + padding * 2) + 'px';
  artistCanvas.style.left = -padding + 'px';
  artistCanvas.style.top = -padding + 'px';
  ctxArtist.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  ctxArtist.clearRect(0, 0, artistCanvas.width, artistCanvas.height);
  ctxArtist.strokeStyle = menuColor2.value;
  ctxArtist.lineWidth = stroke;
  ctxArtist.lineJoin = 'miter';
  ctxArtist.lineCap = 'square';
  
  // Teken vijfhoek: zelfde vorm als textBox2
  ctxArtist.beginPath();
  ctxArtist.moveTo(padding, padding);
  ctxArtist.lineTo(w + padding, padding);
  ctxArtist.lineTo(w + padding, h + padding);
  ctxArtist.lineTo(corner1X * w + padding, h + padding);
  ctxArtist.lineTo(padding, corner2Y * h + padding);
  ctxArtist.closePath();
  ctxArtist.stroke();
}

function dprResizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  lineOverlay.width = Math.round(canvas.clientWidth * dpr);
  lineOverlay.height = Math.round(canvas.clientHeight * dpr);
  lineOverlay.style.width = canvas.clientWidth + 'px';
  lineOverlay.style.height = canvas.clientHeight + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
}

function resizeAndUpdate() {
  dprResizeCanvas();
  updatePentagon();
  drawTextBox1Contour();
  drawTextBox2Contour();
  drawDecorativeStripes();
}

window.addEventListener('resize', resizeAndUpdate);
resizeAndUpdate();

function updateTextBoxes() {
  // Haal cijfer positie op (in percentage van canvas)
  const shapeTop = parseFloat(menuPosY.value);
  const shapeLeft = parseFloat(menuPosX.value);
  
  // Canvas dimensies
  const canvasWidth = 600;
  const canvasHeight = 894;
  
  // Haal cijfer grootte op
  const shapeFontSize = parseFloat(menuFontSize.value);
  
  // TextBox1 (boven)
  const box1Width = parseFloat(menuBox1Width.value);
  const box1Height = parseFloat(menuBox1Height.value);
  const box1Text = menuBox1TextInput.value;
  
  const manualFontSize1 = parseFloat(menuBox1FontSize.value);
  const box1FontSize = manualFontSize1;
  const box1TextX = parseFloat(menuBox1TextX.value);
  const box1TextY = parseFloat(menuBox1TextY.value);
  
  textBox1.style.width = box1Width + 'px';
  textBox1.style.height = box1Height + 'px';
  textBox1.style.fontSize = box1FontSize + 'px';
  textBox1.style.boxSizing = 'border-box';
  
  // Bereken offset van centrum (50% = 0 offset)
  const offsetX1 = ((box1TextX - 50) / 50) * (box1Width / 2);
  const offsetY1 = ((box1TextY - 50) / 50) * (box1Height / 2);
  
  textBox1.style.justifyContent = 'center';
  textBox1.style.alignItems = 'center';
  textBox1.style.paddingLeft = (20 + offsetX1) + 'px';
  textBox1.style.paddingRight = (20 - offsetX1) + 'px';
  textBox1.style.paddingTop = (10 + offsetY1) + 'px';
  textBox1.style.paddingBottom = (10 - offsetY1) + 'px';
  
  textBox1.textContent = box1Text;
  
  const corner1Y = parseFloat(menuBox1Corner1Y.value);
  const corner2X = parseFloat(menuBox1Corner2X.value);
  textBox1.style.clipPath = `polygon(0% 0%, ${corner2X}% 0%, 100% ${corner1Y}%, 100% 100%, 0% 100%)`;
  
  // Update SVG clip path
  const textBox1ClipPath = document.getElementById('textBox1ClipPath');
  if (textBox1ClipPath) {
    const w = box1Width;
    const h = box1Height;
    const points = [
      `0,0`,
      `${corner2X/100*w},0`,
      `${w},${corner1Y/100*h}`,
      `${w},${h}`,
      `0,${h}`
    ].join(' ');
    textBox1ClipPath.setAttribute('points', points);
  }
  
  // TextBox2 (onder)
  const box2Width = parseFloat(menuBox2Width.value);
  const box2Height = parseFloat(menuBox2Height.value);
  const box2Text = menuBox2TextInput.value;
  
  const manualFontSize2 = parseFloat(menuBox2FontSize.value);
  const box2FontSize = manualFontSize2;
  const box2TextX = parseFloat(menuBox2TextX.value);
  const box2TextY = parseFloat(menuBox2TextY.value);
  
  textBox2.style.width = box2Width + 'px';
  textBox2.style.height = box2Height + 'px';
  textBox2.style.fontSize = box2FontSize + 'px';
  textBox2.style.boxSizing = 'border-box';
  
  // Bereken offset van centrum (50% = 0 offset)
  const offsetX2 = ((box2TextX - 50) / 50) * (box2Width / 2);
  const offsetY2 = ((box2TextY - 50) / 50) * (box2Height / 2);
  
  textBox2.style.justifyContent = 'center';
  textBox2.style.alignItems = 'center';
  textBox2.style.paddingLeft = (20 + offsetX2) + 'px';
  textBox2.style.paddingRight = (20 - offsetX2) + 'px';
  textBox2.style.paddingTop = (10 + offsetY2) + 'px';
  textBox2.style.paddingBottom = (10 - offsetY2) + 'px';
  
  textBox2.textContent = box2Text;
  
  const corner1X = parseFloat(menuBox2Corner1X.value);
  const corner2Y = parseFloat(menuBox2Corner2Y.value);
  textBox2.style.clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, ${corner1X}% 100%, 0% ${corner2Y}%)`;
  
  // Update SVG clip path
  const textBox2ClipPath = document.getElementById('textBox2ClipPath');
  if (textBox2ClipPath) {
    const w = box2Width;
    const h = box2Height;
    const points = [
      `0,0`,
      `${w},0`,
      `${w},${h}`,
      `${corner1X/100*w},${h}`,
      `0,${corner2Y/100*h}`
    ].join(' ');
    textBox2ClipPath.setAttribute('points', points);
  }
  
  // Bereken gap in pixels (vast t.o.v. cijfergrootte)
  const gapSlider = parseFloat(menuBoxGap.value) / 100;
  const maxGapPx = shapeFontSize / 4;
  const minGapPx = maxGapPx * 0.15;
  const gapPx = minGapPx + (maxGapPx - minGapPx) * gapSlider;
  
  // Converteer alles naar percentages
  const gapPercent = (gapPx / canvasHeight) * 100;
  const box1HeightPercent = (box1Height / canvasHeight) * 100;
  const box2HeightPercent = (box2Height / canvasHeight) * 100;
  const box1WidthPercent = (box1Width / canvasWidth) * 100;
  const box2WidthPercent = (box2Width / canvasWidth) * 100;
  
  // Bereken posities - gebruik cijfer positie direct zonder breedte correctie
  const box1TopPercent = shapeTop - (gapPercent / 2) - box1HeightPercent;
  const box1LeftPercent = shapeLeft; // Transform doet de centrering
  
  const box2TopPercent = shapeTop + (gapPercent / 2);
  const box2LeftPercent = shapeLeft; // Transform doet de centrering
  
  // Zet posities
  document.querySelector('.textBoxWrapper').style.top = box1TopPercent + '%';
  document.querySelector('.textBoxWrapper').style.left = box1LeftPercent + '%';
  
  document.querySelector('.textBoxWrapper2').style.top = box2TopPercent + '%';
  document.querySelector('.textBoxWrapper2').style.left = box2LeftPercent + '%';
  
  drawTextBox1Contour();
  drawTextBox2Contour();
}

function drawTextBox1Contour() {
  const dpr = window.devicePixelRatio || 1;
  const w = textBox1.offsetWidth;
  const h = textBox1.offsetHeight;
  const stroke = parseFloat(menuStrokeWidth.value);
  const corner1Y = parseFloat(menuBox1Corner1Y.value) / 100;
  const corner2X = parseFloat(menuBox1Corner2X.value) / 100;
  
  const padding = stroke;
  textBox1Canvas.width = Math.round((w + padding * 2) * dpr);
  textBox1Canvas.height = Math.round((h + padding * 2) * dpr);
  textBox1Canvas.style.width = (w + padding * 2) + 'px';
  textBox1Canvas.style.height = (h + padding * 2) + 'px';
  textBox1Canvas.style.left = -padding + 'px';
  textBox1Canvas.style.top = -padding + 'px';
  ctxBox1.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  ctxBox1.clearRect(0, 0, textBox1Canvas.width, textBox1Canvas.height);
  ctxBox1.strokeStyle = menuColor2.value;
  ctxBox1.lineWidth = stroke;
  ctxBox1.lineJoin = 'miter';
  ctxBox1.lineCap = 'square';
  
  ctxBox1.beginPath();
  ctxBox1.moveTo(padding, padding);
  ctxBox1.lineTo(corner2X * w + padding, padding);
  ctxBox1.lineTo(w + padding, corner1Y * h + padding);
  ctxBox1.lineTo(w + padding, h + padding);
  ctxBox1.lineTo(padding, h + padding);
  ctxBox1.closePath();
  ctxBox1.stroke();
}

function drawTextBox2Contour() {
  const dpr = window.devicePixelRatio || 1;
  const w = textBox2.offsetWidth;
  const h = textBox2.offsetHeight;
  const stroke = parseFloat(menuStrokeWidth.value);
  const corner1X = parseFloat(menuBox2Corner1X.value) / 100;
  const corner2Y = parseFloat(menuBox2Corner2Y.value) / 100;
  
  const padding = stroke;
  textBox2Canvas.width = Math.round((w + padding * 2) * dpr);
  textBox2Canvas.height = Math.round((h + padding * 2) * dpr);
  textBox2Canvas.style.width = (w + padding * 2) + 'px';
  textBox2Canvas.style.height = (h + padding * 2) + 'px';
  textBox2Canvas.style.left = -padding + 'px';
  textBox2Canvas.style.top = -padding + 'px';
  ctxBox2.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  ctxBox2.clearRect(0, 0, textBox2Canvas.width, textBox2Canvas.height);
  ctxBox2.strokeStyle = menuColor3.value;
  ctxBox2.lineWidth = stroke;
  ctxBox2.lineJoin = 'miter';
  ctxBox2.lineCap = 'square';
  
  ctxBox2.beginPath();
  ctxBox2.moveTo(padding, padding);
  ctxBox2.lineTo(w + padding, padding);
  ctxBox2.lineTo(w + padding, h + padding);
  ctxBox2.lineTo(corner1X * w + padding, h + padding);
  ctxBox2.lineTo(padding, corner2Y * h + padding);
  ctxBox2.closePath();
  ctxBox2.stroke();
}

function drawDecorativeStripes() {
  if (!corners) return;
  
  const dpr = window.devicePixelRatio || 1;
  const strokeWidth = parseFloat(menuStrokeWidth.value);
  const accentColor = menuColor3.value;
  const strokeColor = menuColor2.value;
  
  const canvasWidth = 600;
  const canvasHeight = 894;
  
  const c4 = {x: (corners.c4XVal / 100) * canvasWidth, y: (corners.c4Y / 100) * canvasHeight};
  const c5 = {x: (corners.c5X / 100) * canvasWidth, y: (corners.c5YVal / 100) * canvasHeight};
  
  const dx = c5.x - c4.x;
  const dy = c5.y - c4.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const dirX = dx / length;
  const dirY = dy / length;
  
  const trapWidth = parseFloat(menuTrapWidth.value);
  const trapLength2 = parseFloat(menuTrapLength2.value);
  const trapLength1 = parseFloat(menuTrapLength1.value);
  const trap1OffsetX = parseFloat(menuTrap1PosX.value);
  const trap2OffsetX = parseFloat(menuTrap2PosX.value);
  const gap = 20;
  
  const p1_trap2_x = 460 + trap2OffsetX;
  const p1_trap2_y = 0;
  const p2_trap2_x = p1_trap2_x + trapWidth;
  const p2_trap2_y = 0;
  const p3_trap2_x = p2_trap2_x + trapLength2 * dirX;
  const p3_trap2_y = p2_trap2_y + trapLength2 * dirY;
  const p4_trap2_x = p1_trap2_x + trapLength2 * dirX;
  const p4_trap2_y = p1_trap2_y + trapLength2 * dirY;
  
  const p1_trap1_x = 460 - trapWidth - gap + trap1OffsetX;
  const p1_trap1_y = 0;
  const p2_trap1_x = p1_trap1_x + trapWidth;
  const p2_trap1_y = 0;
  const p3_trap1_x = p2_trap1_x + trapLength1 * dirX;
  const p3_trap1_y = p2_trap1_y + trapLength1 * dirY;
  const p4_trap1_x = p1_trap1_x + trapLength1 * dirX;
  const p4_trap1_y = p1_trap1_y + trapLength1 * dirY;
  
  function drawTrapezium(ctx, canvasEl, points, text, dirX, dirY, trapWidth, textPos) {
    const {p1, p2, p3, p4} = points;
    
    const allX = [p1.x, p2.x, p3.x, p4.x];
    const allY = [p1.y, p2.y, p3.y, p4.y];
    const minX = Math.min(...allX);
    const minY = Math.min(...allY);
    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);
    
    const canvasW = maxX - minX + strokeWidth * 2;
    const canvasH = maxY - minY + strokeWidth * 2;
    
    canvasEl.width = Math.round(canvasW * dpr);
    canvasEl.height = Math.round(canvasH * dpr);
    canvasEl.style.width = canvasW + 'px';
    canvasEl.style.height = canvasH + 'px';
    canvasEl.style.left = (minX - strokeWidth) + 'px';
    canvasEl.style.top = (minY - strokeWidth) + 'px';
    canvasEl.style.transform = 'none';
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    const offset = {x: minX - strokeWidth, y: minY - strokeWidth};
    
    ctx.beginPath();
    ctx.moveTo(p1.x - offset.x, p1.y - offset.y);
    ctx.lineTo(p2.x - offset.x, p2.y - offset.y);
    ctx.lineTo(p3.x - offset.x, p3.y - offset.y);
    ctx.lineTo(p4.x - offset.x, p4.y - offset.y);
    ctx.closePath();
    
    ctx.fillStyle = accentColor;
    ctx.fill();
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'square';
    ctx.stroke();
    
    // Bereken dynamische font size op basis van trapWidth en slider
    const fontSizeSlider = parseFloat(menuTrapFontSize.value);
    // Bereken maximale font size op basis van trapWidth (60% van de breedte)
    const maxFontSize = trapWidth * 0.6;
    // Gebruik de kleinste van slider waarde of maximum
    const fontSize = Math.min(fontSizeSlider, maxFontSize);
    
    // Tekst positie op basis van parameter (0-100%)
    const textPosPercent = textPos / 100;
    
    // Bereken positie langs de trapezium
    const textX = p1.x + (p4.x - p1.x) * textPosPercent;
    const textY = p1.y + (p4.y - p1.y) * textPosPercent;
    
    // Voeg offset toe voor verticale centrering binnen de breedte
    const centerX = textX + (p2.x - p1.x) / 2;
    const centerY = textY + (p2.y - p1.y) / 2;
    
    const angle = Math.atan2(dirY, dirX);
    
    const localX = centerX - offset.x;
    const localY = centerY - offset.y;
    
    ctx.save();
    ctx.translate(localX, localY);
    ctx.rotate(angle);
    
    ctx.fillStyle = strokeColor;
    ctx.font = `bold ${fontSize}px "Bebas Neue", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);
    
    ctx.restore();
  }
  
  const trapezium1 = {
    p1: {x: p1_trap1_x, y: p1_trap1_y},
    p2: {x: p2_trap1_x, y: p2_trap1_y},
    p3: {x: p3_trap1_x, y: p3_trap1_y},
    p4: {x: p4_trap1_x, y: p4_trap1_y}
  };
  const trap1TextPos = parseFloat(menuTrap1TextPos.value);
  drawTrapezium(ctxStripe1, stripe1, trapezium1, menuTrapText1Input.value, dirX, dirY, trapWidth, trap1TextPos);
  
  const trapezium2 = {
    p1: {x: p1_trap2_x, y: p1_trap2_y},
    p2: {x: p2_trap2_x, y: p2_trap2_y},
    p3: {x: p3_trap2_x, y: p3_trap2_y},
    p4: {x: p4_trap2_x, y: p4_trap2_y}
  };
  const trap2TextPos = parseFloat(menuTrap2TextPos.value);
  drawTrapezium(ctxStripe2, stripe2, trapezium2, menuTrapText2Input.value, dirX, dirY, trapWidth, trap2TextPos);
}

function updateShapeStyle() {
  const mainColor = menuColor1.value;
  const accentColor = menuColor3.value;
  const strokeColor = menuColor2.value;
  const strokeWidth = parseFloat(menuStrokeWidth.value);

  shape.style.fontSize = menuFontSize.value+'px';
  shape.style.webkitTextFillColor = mainColor;
  shape.style.webkitTextStroke = (strokeWidth * 2)+'px '+strokeColor;
  shape.style.textStroke = (strokeWidth * 2)+'px '+strokeColor;

  textBox1.style.backgroundColor = mainColor;
  textBox1.style.color = 'white';
  textBox1.style.webkitTextStroke = '0px';
    
  textBox2.style.color = 'white';
  textBox2.style.backgroundColor = mainColor;
  textBox2.style.webkitTextStroke = '0px';

  canvas.style.backgroundColor = mainColor;

  drawLine();
  drawTextBox1Contour();
  drawTextBox2Contour();
  drawDecorativeStripes();
  updateTicketSection();
  updateArtistBox();
  updateExtraInfo();
}

// Event listeners
menuFontSize.addEventListener('input', updateShapeStyle);
menuColor1.addEventListener('input', updateShapeStyle);
menuColor2.addEventListener('input', updateShapeStyle);
menuColor3.addEventListener('input', updateShapeStyle);
menuStrokeWidth.addEventListener('input', updateShapeStyle);

menuPosX.addEventListener('input', function() {
  shape.style.left = menuPosX.value + '%';
  updateTextBoxes();
});

menuPosY.addEventListener('input', function() {
  shape.style.top = menuPosY.value + '%';
  updateTextBoxes();
});
menuTrapWidth.addEventListener('input', drawDecorativeStripes);
menuTrapLength1.addEventListener('input', drawDecorativeStripes);
menuTrapLength2.addEventListener('input', drawDecorativeStripes);
menuTrap1TextPos.addEventListener('input', drawDecorativeStripes);
menuTrap2TextPos.addEventListener('input', drawDecorativeStripes);
menuTrapFontSize.addEventListener('input', drawDecorativeStripes);
menuTrap1PosX.addEventListener('input', drawDecorativeStripes);
menuTrap2PosX.addEventListener('input', drawDecorativeStripes);
menuBox1FontSize.addEventListener('input', updateTextBoxes);
menuBox1Width.addEventListener('input', updateTextBoxes);
menuBox1Height.addEventListener('input', updateTextBoxes);
menuBox1TextX.addEventListener('input', updateTextBoxes);
menuBox1TextY.addEventListener('input', updateTextBoxes);
menuBox1Corner1Y.addEventListener('input', updateTextBoxes);
menuBox1Corner2X.addEventListener('input', updateTextBoxes);
menuBoxGap.addEventListener('input', updateTextBoxes);
menuBox2FontSize.addEventListener('input', updateTextBoxes);
menuBox2Width.addEventListener('input', updateTextBoxes);
menuBox2Height.addEventListener('input', updateTextBoxes);
menuBox2TextX.addEventListener('input', updateTextBoxes);
menuBox2TextY.addEventListener('input', updateTextBoxes);
menuBox2Corner1X.addEventListener('input', updateTextBoxes);
menuBox2Corner2Y.addEventListener('input', updateTextBoxes);
menuTicketInfoFontSize.addEventListener('input', updateTicketSection);
menuTicketPriceFontSize.addEventListener('input', updateTicketSection);
menuTicketHeight.addEventListener('input', updateTicketSection);
menuTicketWidth.addEventListener('input', updateTicketSection);
menuTicketPosX.addEventListener('input', updateTicketSection);
menuTicketPosY.addEventListener('input', updateTicketSection);
menuArtistFontSize.addEventListener('input', updateArtistBox);
menuArtistWidth.addEventListener('input', updateArtistBox);
menuArtistHeight.addEventListener('input', updateArtistBox);
menuArtistPosX.addEventListener('input', updateArtistBox);
menuArtistDistance.addEventListener('input', updateArtistBox);
menuArtistCorner1X.addEventListener('input', updateArtistBox);
menuArtistCorner2Y.addEventListener('input', updateArtistBox);
menuExtraInfoFontSize.addEventListener('input', updateExtraInfo);
menuExtraInfoX.addEventListener('input', updateExtraInfo);
menuExtraInfoDistance.addEventListener('input', updateExtraInfo);

canvasWrapper.style.transformOrigin='center center';
canvasWrapper.style.transform=`translate(${panX}px, ${panY}px) scale(${currentScale})`;

// Drag to pan functionaliteit
canvas.addEventListener('mousedown', e => {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartPanX = panX;
  dragStartPanY = panY;
  canvas.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - dragStartX;
  const deltaY = e.clientY - dragStartY;
  
  panX = dragStartPanX + deltaX;
  panY = dragStartPanY + deltaY;
  
  canvasWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    canvas.style.cursor = 'grab';
  }
});

// Zet cursor naar grab wanneer over canvas
canvas.style.cursor = 'grab';

canvas.addEventListener('wheel', e=>{
  e.preventDefault();
  
  // Bereken nieuwe scale
  const zoomAmount = 0.05;
  currentScale += e.deltaY < 0 ? zoomAmount : -zoomAmount;
  currentScale = Math.min(Math.max(currentScale, 0.1), 3);
  
  // Houd transform origin gecentreerd
  canvasWrapper.style.transformOrigin = 'center center';
  canvasWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
});

function updatePentagon(){
  const shift=parseInt(menuCornerShift.value)||0;
  const canvasWidth=600;
  const canvasHeight=894;
  const baseMargin=6;
  const marginX=(baseMargin/canvasWidth)*100;
  const marginY=(baseMargin/canvasHeight)*100;

  const c1X=100-marginX-shift;
  const c1Y=100-marginY-shift;
  const c2X=marginX+shift;
  const c2Y=100-marginY-shift;
  const c3X=marginX+shift;
  const c3Y=marginY+shift;

  let c4XVal=parseInt(menuCorner4X.value)||0;
  c4XVal = Math.min(Math.max(c4XVal,c2X),c1X-3);
  const c4Y=c3Y;
  const c5X=c1X;
  let c5YVal=parseInt(menuCorner5Y.value)||0;
  c5YVal = Math.min(Math.max(c5YVal,c3Y+5),c2Y);

  corners={c1X,c1Y,c2X,c2Y,c3X,c3Y,c4XVal,c4Y,c5X,c5YVal};
  
  // Update SVG polygon in plaats van clip-path
  const polygon = document.getElementById('innerPentagonPath');
  const toPx = (x, y) => `${(x/100)*canvasWidth},${(y/100)*canvasHeight}`;
  const points = [
    toPx(c1X, c1Y),
    toPx(c2X, c2Y),
    toPx(c3X, c3Y),
    toPx(c4XVal, c4Y),
    toPx(c5X, c5YVal)
  ].join(' ');
  polygon.setAttribute('points', points);
  
  drawLine();
  drawDecorativeStripes();
}

function drawLine(){
  if(!corners) return;
  const canvasWidth = 600;
  const canvasHeight = 894;
  ctx.clearRect(0,0,lineOverlay.width,lineOverlay.height);
  ctx.strokeStyle = menuColor2.value;
  ctx.lineWidth = Math.max(1,parseFloat(menuStrokeWidth.value));
  ctx.lineJoin='miter';
  ctx.lineCap='square';
  const toPx=(x,y)=>({x:(x/100)*canvasWidth,y:(y/100)*canvasHeight});
  const p1=toPx(corners.c1X,corners.c1Y);
  const p2=toPx(corners.c2X,corners.c2Y);
  const p3=toPx(corners.c3X,corners.c3Y);
  const p4=toPx(corners.c4XVal,corners.c4Y);
  const p5=toPx(corners.c5X,corners.c5YVal);
  ctx.beginPath();
  ctx.moveTo(p5.x,p5.y);
  ctx.lineTo(p1.x,p1.y);
  ctx.lineTo(p2.x,p2.y);
  ctx.lineTo(p3.x,p3.y);
  ctx.lineTo(p4.x,p4.y);
  ctx.lineTo(p5.x,p5.y);
  ctx.stroke();
}

menuCornerShift.addEventListener('input',updatePentagon);
menuCorner4X.addEventListener('input',updatePentagon);
menuCorner5Y.addEventListener('input',updatePentagon);

const variablesItem=document.getElementById('variablesItem');
variablesItem.addEventListener('click',e=>{
  e.stopPropagation();
  variablesItem.classList.toggle('open');
});
const submenuItems=document.querySelectorAll('.submenuItem');
submenuItems.forEach(item=>{
  item.addEventListener('click', e=>{
    e.stopPropagation();
    item.classList.toggle('open');
  });
  const inputs=item.querySelectorAll('input');
  inputs.forEach(input=>input.addEventListener('click', e=>e.stopPropagation()));
});
document.body.addEventListener('click',()=>{
  variablesItem.classList.remove('open');
  submenuItems.forEach(item=>item.classList.remove('open'));
});

// Text menu synchronisatie - update interne variabelen wanneer Text menu inputs veranderen
menuNumberInputText.addEventListener('input', e => {
  shape.textContent = e.target.value;
});

menuBox1TextInput.addEventListener('input', e => {
  textBox1.textContent = e.target.value;
  drawTextBox1Contour();
});

menuBox2TextInput.addEventListener('input', e => {
  textBox2.textContent = e.target.value;
  drawTextBox2Contour();
});

menuTrapText1Input.addEventListener('input', e => {
  drawDecorativeStripes();
});

menuTrapText2Input.addEventListener('input', e => {
  drawDecorativeStripes();
});

menuTicketDateInput.addEventListener('input', e => {
  ticketDate.textContent = e.target.value;
});

menuTicketLocationInput.addEventListener('input', e => {
  ticketLocation.textContent = e.target.value;
});

menuTicketPriceInput.addEventListener('input', e => {
  ticketCenter.textContent = e.target.value;
});

menuTicketOpeningInput.addEventListener('input', e => {
  ticketOpening.textContent = e.target.value;
});

menuTicketClosingInput.addEventListener('input', e => {
  ticketClosing.textContent = e.target.value;
});

menuExtraInfoTextInput.addEventListener('input', e => {
  extraInfo.textContent = e.target.value;
});

menuArtistTextInput.addEventListener('input', e => {
  artistBox.textContent = e.target.value;
  drawArtistContour();
});

async function exportHighRes() {
    const exportButton = document.getElementById('exportButton');
    exportButton.innerText = "Exporting...";
    exportButton.style.opacity = "0.5";

    const canvasNode = document.getElementById('canvas');
    
    // De resolutie die je wilt (A3 kwaliteit op 300 DPI)
    const targetWidth = 6035;
    const targetHeight = 8940;
    const originalWidth = canvasNode.offsetWidth;
    const targetPixelRatio = targetWidth / originalWidth;

    // Filter om te voorkomen dat het menu zelf wordt mee-geëxporteerd
    const filter = (node) => {
        return (node.id !== 'menu' && node.id !== 'exportButton');
    };

    try {
        // Wacht een fractie van een seconde zodat alle stijlen stabiel zijn
        await document.fonts.ready;

        const dataUrl = await htmlToImage.toPng(canvasNode, {
            width: targetWidth,
            height: targetHeight,
            style: {
                transform: `scale(${targetPixelRatio})`,
                transformOrigin: 'top left',
                width: `${canvasNode.offsetWidth}px`,
                height: `${canvasNode.offsetHeight}px`
            },
            pixelRatio: 1, // We regelen de schaal zelf via transform
            backgroundColor: menuColor1.value,
            filter: filter,
            cacheBust: true, // Cruciaal voor GitHub: voorkomt oude plaatjes in de cache
        });

        const link = document.createElement('a');
        link.download = `poster-${menuNumberInputText.value || 'design'}.png`;
        link.href = dataUrl;
        link.click();

    } catch (error) {
        console.error('Export failed:', error);
        alert("Export mislukt. Probeer een screenshot of check de console.");
    } finally {
        exportButton.innerText = "Export PNG (A3)";
        exportButton.style.opacity = "1";
    }
  });
}
// NIEUWE Native Browser Screenshot - gebruikt de moderne getDisplayMedia API
const exportNativeBtn = document.getElementById('exportNativeBtn');
if (exportNativeBtn) {
exportNativeBtn.addEventListener('click', async () => {
  const topMenu = document.getElementById('topMenu');
  topMenu.style.display = 'none';
  
  try {
    // Sla staat op
    const originalTransform = canvasWrapper.style.transform;
    const originalScale = currentScale;
    const originalPanX = panX;
    const originalPanY = panY;
    const originalTop = canvasContainer.style.top;
    
    // Bereken welke schaal nodig is om de poster volledig op het scherm te laten passen
    const posterWidth = 600;
    const posterHeight = 894;
    const availableWidth = window.innerWidth * 0.8; // 80% van scherm breedte
    const availableHeight = window.innerHeight * 0.8; // 80% van scherm hoogte
    
    const scaleToFitWidth = availableWidth / posterWidth;
    const scaleToFitHeight = availableHeight / posterHeight;
    const scaleToFit = Math.min(scaleToFitWidth, scaleToFitHeight, 1); // Niet groter dan origineel
    
    // Reset naar gecentreerde staat met juiste schaal
    currentScale = scaleToFit;
    panX = 0;
    panY = 0;
    canvasWrapper.style.transform = `translate(0px, 0px) scale(${scaleToFit})`;
    canvasContainer.style.top = '50%';
    canvasContainer.style.transform = 'translate(-50%, -50%)';
    canvasContainer.style.left = '50%';
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Probeer de moderne Capture API
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      try {
        // Vraag om screen capture
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: { 
            displaySurface: "browser",
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false,
          preferCurrentTab: true
        });
        
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        
        // Wacht tot video ready is
        await new Promise(resolve => {
          video.onloadedmetadata = resolve;
        });
        
        // Maak screenshot van hele scherm
        const fullCanvas = document.createElement('canvas');
        fullCanvas.width = video.videoWidth;
        fullCanvas.height = video.videoHeight;
        const fullCtx = fullCanvas.getContext('2d');
        fullCtx.drawImage(video, 0, 0);
        
        // Stop stream
        stream.getTracks().forEach(track => track.stop());
        
        // Bereken waar de EXACTE poster canvas is (niet de container)
        const canvasElement = document.getElementById('canvas');
        const rect = canvasElement.getBoundingClientRect();
        
        // Bereken de schaalfactor tussen video en viewport
        const scaleX = video.videoWidth / window.innerWidth;
        const scaleY = video.videoHeight / window.innerHeight;
        
        // Bereken EXACTE crop coordinaten zonder marge
        const cropX = rect.left * scaleX;
        const cropY = rect.top * scaleY;
        const cropWidth = rect.width * scaleX;
        const cropHeight = rect.height * scaleY;
        
        // 51.1 cm x 76.1 cm bij 300 DPI
        // 1 inch = 2.54 cm
        // 51.1 cm = 20.118 inch = 6035 pixels bij 300 DPI
        // 76.1 cm = 29.961 inch = 8988 pixels bij 300 DPI
        const targetWidth = Math.round(51.1 / 2.54 * 300); // 6035 pixels
        const targetHeight = Math.round(76.1 / 2.54 * 300); // 8988 pixels
        
        // Maak nieuwe canvas met exacte print afmetingen
        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = targetWidth;
        croppedCanvas.height = targetHeight;
        const croppedCtx = croppedCanvas.getContext('2d');
        
        // Gebruik high-quality image rendering
        croppedCtx.imageSmoothingEnabled = true;
        croppedCtx.imageSmoothingQuality = 'high';
        
        // Teken alleen het poster gedeelte, geschaald naar print grootte
        croppedCtx.drawImage(
          fullCanvas,
          cropX, cropY, cropWidth, cropHeight, // Source (waar de poster is op het scherm)
          0, 0, targetWidth, targetHeight // Destination (print grootte)
        );
        
        // Download de bijgesneden versie
        croppedCanvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'poster-print-51x76cm-300dpi.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png', 1.0);
        
        alert(`Screenshot succesvol opgeslagen!\n\nAfmetingen: 51.1 × 76.1 cm\nResolutie: 300 DPI\nPixels: ${targetWidth} × ${targetHeight}\n\nKlaar voor professionele print!`);
        
      } catch (captureErr) {
        console.error('Capture error:', captureErr);
        alert('Automatische screenshot mislukt.\n\nMogelijke redenen:\n- Je hebt geen toestemming gegeven\n- Je browser ondersteunt dit niet\n\nGebruik in plaats daarvan de "Manual Screenshot" optie.');
      }
    } else {
      alert('Je browser ondersteunt geen automatische screenshots.\n\nGebruik de "Manual Screenshot" optie in plaats daarvan.');
    }
    
    // Herstel staat
    currentScale = originalScale;
    panX = originalPanX;
    panY = originalPanY;
    canvasWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
    canvasContainer.style.top = originalTop;
    canvasContainer.style.transform = '';
    canvasContainer.style.left = '';
    topMenu.style.display = 'flex';
    
  } catch (error) {
    console.error('Export error:', error);
    alert('Er ging iets mis. Gebruik de "Manual Screenshot" optie.');
    canvasContainer.style.transform = '';
    canvasContainer.style.left = '';
    topMenu.style.display = 'flex';
  }
});
}

// Screenshot export - toont de poster fullscreen, geen knop - gebruik ESC om terug te gaan
const exportScreenshotBtn = document.getElementById('exportScreenshotBtn');
if (exportScreenshotBtn) {
exportScreenshotBtn.addEventListener('click', async () => {
  const topMenu = document.getElementById('topMenu');
  topMenu.style.display = 'none';
  
  try {
    // Reset zoom en pan voor schone screenshot
    const originalTransform = canvasWrapper.style.transform;
    const originalScale = currentScale;
    const originalPanX = panX;
    const originalPanY = panY;
    const originalTop = canvasContainer.style.top;
    
    // Zet naar perfecte weergave
    currentScale = 1;
    panX = 0;
    panY = 0;
    canvasWrapper.style.transform = 'translate(0px, 0px) scale(1)';
    canvasContainer.style.top = '0';
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Maak instructie overlay met ESC instructie
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.color = 'white';
    overlay.style.fontFamily = 'Bebas Neue, sans-serif';
    
    const instructionBox = document.createElement('div');
    instructionBox.style.backgroundColor = 'white';
    instructionBox.style.color = 'black';
    instructionBox.style.padding = '40px';
    instructionBox.style.borderRadius = '10px';
    instructionBox.style.textAlign = 'center';
    instructionBox.style.fontSize = '24px';
    instructionBox.innerHTML = `
      <div style="font-size: 32px; margin-bottom: 20px;"><strong>Screenshot Instructies</strong></div>
      <div style="margin: 20px 0;">De poster wordt straks getoond zonder enige knoppen of overlays</div>
      <div style="margin: 20px 0; padding: 20px; background: #f0f0f0;">
        <strong>Stap 1:</strong> Klik op "Start Screenshot Mode"<br><br>
        <strong>Stap 2:</strong> Maak screenshot:<br>
        <strong>Mac:</strong> <code>Cmd + Shift + 4</code> en selecteer de poster<br>
        <strong>Windows:</strong> <code>Windows + Shift + S</code> en selecteer de poster<br><br>
        <strong>Stap 3:</strong> Druk <code>ESC</code> om terug te gaan naar de editor
      </div>
      <button id="readyBtn" style="padding: 15px 40px; font-size: 20px; font-family: 'Bebas Neue', sans-serif; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 5px; margin-top: 20px;">Start Screenshot Mode</button>
    `;
    
    overlay.appendChild(instructionBox);
    document.body.appendChild(overlay);
    
    // Keyboard handler voor ESC
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        // Herstel alles
        currentScale = originalScale;
        panX = originalPanX;
        panY = originalPanY;
        canvasWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
        canvasContainer.style.top = originalTop;
        topMenu.style.display = 'flex';
        document.removeEventListener('keydown', escHandler);
        
        // Verwijder instructie tekst als die er nog is
        const instruction = document.getElementById('escInstruction');
        if (instruction) instruction.remove();
      }
    };
    
    document.getElementById('readyBtn').addEventListener('click', () => {
      overlay.remove();
      
      // Voeg ESC instructie toe (klein en onopvallend)
      const escInstruction = document.createElement('div');
      escInstruction.id = 'escInstruction';
      escInstruction.style.position = 'fixed';
      escInstruction.style.bottom = '10px';
      escInstruction.style.right = '10px';
      escInstruction.style.padding = '8px 15px';
      escInstruction.style.fontSize = '14px';
      escInstruction.style.fontFamily = 'Bebas Neue, sans-serif';
      escInstruction.style.backgroundColor = 'rgba(0,0,0,0.7)';
      escInstruction.style.color = 'white';
      escInstruction.style.borderRadius = '5px';
      escInstruction.style.zIndex = '100000';
      escInstruction.textContent = 'Druk ESC om terug te gaan';
      
      document.body.appendChild(escInstruction);
      
      // Activeer ESC handler
      document.addEventListener('keydown', escHandler);
    });
    
  } catch (error) {
    console.error('Export error:', error);
    topMenu.style.display = 'flex';
  }
});
}



// PNG Export functionaliteit - gebruikt handmatige perfecte rendering
const exportPngBtn = document.getElementById('exportPngBtn');
if (exportPngBtn) {
exportPngBtn.addEventListener('click', async () => {
  const topMenu = document.getElementById('topMenu');
  topMenu.style.display = 'none';
  
  try {
    const exportCanvas = await renderPosterToCanvas();
    
    // Download als PNG
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = exportCanvas.toDataURL('image/png', 1.0);
    link.click();
    
    topMenu.style.display = 'flex';
    
  } catch (error) {
    console.error('Error exporting PNG:', error);
    alert('Error creating PNG: ' + error.message);
    topMenu.style.display = 'flex';
  }
});
}

// PDF Export functionaliteit - gebruikt dom-to-image
// PDF Export (Groot formaat - 51.1 x 76.1 cm)
const exportPdfBtn = document.getElementById('exportPdfBtn');
if (exportPdfBtn) {
  exportPdfBtn.addEventListener('click', async () => {
    // Vraag de gebruiker om een naam 
    const baseName = prompt("Geef een naam op voor je PDF-export:", "mijn_poster");
    
    if (baseName === null) return;

    const canvasNode = document.getElementById('canvas');
    const topMenu = document.getElementById('topMenu');

    exportPdfBtn.innerText = "Generating PDF...";
    exportPdfBtn.style.opacity = "0.5";
    topMenu.style.display = 'none';

    try {
      const targetPixelRatio = EXPORT_WIDTH / 600;
      const imgData = await htmlToImage.toPng(canvasNode, {
        width: 600,
        height: 894,
        pixelRatio: targetPixelRatio,
        backgroundColor: menuColor1.value,
        cacheBust: true,
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [511, 761]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 511, 761);
      
      // Gebruik de opgegeven naam 
      const fileName = baseName.trim() || `poster_${Date.now()}`;
      pdf.save(`${fileName}.pdf`);

    } catch (error) {
      console.error('PDF Export fout:', error);
      alert('PDF Export mislukt: ' + error.message);
    } finally {
      topMenu.style.display = 'flex';
      exportPdfBtn.innerText = "Export as PDF";
      exportPdfBtn.style.opacity = "1";
    }
  });
}

// Initialiseer de shape positie
shape.style.left = menuPosX.value + '%';
shape.style.top = menuPosY.value + '%';

updateShapeStyle();
updatePentagon();
updateTextBoxes();
updateTicketSection();
updateExtraInfo();
updateArtistBox();
drawTextBox1Contour();
drawTextBox2Contour();
drawDecorativeStripes();
