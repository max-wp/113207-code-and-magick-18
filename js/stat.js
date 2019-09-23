'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW = 10;
var GAP = 15;
var FONT_GAP = 15;
var COLUMN_GAP = 50;
var COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW, CLOUD_Y + CLOUD_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP + FONT_GAP);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var columnMaxHeight = COLUMN_HEIGHT * times[i] / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + (i) * COLUMN_GAP + (i + 1) * COLUMN_WIDTH, COLUMN_GAP + FONT_GAP + GAP + GAP / 2 + COLUMN_HEIGHT - columnMaxHeight);
    ctx.fillText(names[i], CLOUD_X + (i) * COLUMN_GAP + (i + 1) * COLUMN_WIDTH, CLOUD_Y + CLOUD_HEIGHT - GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + i * COLUMN_GAP + (i + 1) * COLUMN_WIDTH, CLOUD_Y + CLOUD_HEIGHT + GAP - COLUMN_GAP, COLUMN_WIDTH, -columnMaxHeight);
  }
};
