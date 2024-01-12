<template>
	<div class="flex h-full">
		<n-card class="rounded-10px shadow-sm">
			<div class="flex items-center justify-center h-full w-full">
				<div
				class="gridContainer"
				@mousemove="gridMove"
				:style="{
					gridTemplateColumns: col,
					gridTemplateRows: row,
				}"
			>
				<div
					v-for="(item, index) in gridArr"
					:key="item"
					:data-pos="item"
					:data-index="index"
				>
					<div v-if="currentIndex === index" class="light"></div>
				</div>
			</div>
			</div>
		</n-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

const gridArr = ["0-0", "1-0", "2-0", "0-1", "1-1", "2-1", "0-2", "1-2", "2-2"];
const currentIndex = ref(0);

setInterval(() => {
	currentIndex.value = (currentIndex.value + 1) % 9;
}, 1000);

const pos = reactive({
	x: 3,
	y: 3,
});

const col = computed(() => {
	let def = ["1fr", "1fr", "1fr"];
	if (pos.x === 3) return def.join(" ");
	for (let index = 0; index < def.length; index++) {
		if (index === pos.x) def[index] = "1fr";
		else def[index] = "100px";
	}
	return def.join(" ");
});

const row = computed(() => {
	let def = ["1fr", "1fr", "1fr"];
	if (pos.y === 3) return def.join(" ");
	for (let index = 0; index < def.length; index++) {
		if (index === pos.y) def[index] = "1fr";
		else def[index] = "100px";
	}
	return def.join(" ");
});

const gridMove = (e: MouseEvent) => {
	let currentPos = (e.target as HTMLElement)?.dataset?.pos;
	if (!currentPos) return;
	let [x, y] = currentPos.split("-");
	pos.x = Number(x);
	pos.y = Number(y);

	getDominantColor((e.target as HTMLDivElement).firstChild as HTMLImageElement);
};

// 获取图片主色调
const getDominantColor = (img: HTMLImageElement) => {
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.drawImage(img, 0, 0);
	let imageData = ctx.getImageData(0, 0, img.width, img.height);
	let data = imageData.data;

	let r = 0,
		g = 0,
		b = 0;
	let pixelArray = [];
	for (let i = 0; i < data.length; i += 4) {
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
		if (!(r > 250 && g > 250 && b > 250)) {
			pixelArray.push([r, g, b]);
		}
	}

	console.log('pixelArray', pixelArray);

	r = Math.floor(r / (data.length / 4));
	g = Math.floor(g / (data.length / 4));
	b = Math.floor(b / (data.length / 4));
	console.log('rgb', r, g, b);

	return `rgb(${r},${g},${b})`;
};

</script>

<style lang="scss" scoped>
.light {
	position: relative;
	height: 100%;
	text-align: center;
	font-size: 24px;
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 4px;
		border: 1px solid gold;
		transition: all 0.5s;
		animation: clippath 3s infinite linear;
	}
	@keyframes clippath {
		0%,
		100% {
			clip-path: inset(0 0 95% 0);
		}
		25% {
			clip-path: inset(0 95% 0 0);
		}
		50% {
			clip-path: inset(95% 0 0 0);
		}
		75% {
			clip-path: inset(0 0 0 95%);
		}
	}
}
.gridContainer {
	display: grid;
	width: 500px;
	height: 500px;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	& > div {
		border: 1px solid #646cff;
		overflow: hidden;
		border-radius: 4px;
		padding: 1px;
		background-clip: content-box;
		cursor: pointer;

	}
	$color-arr: #646cff, #f0932b, #64ff64, #ff64ff, #ffff64, #64ffff, #ff6464, #646cff, #badc58;
	@for $i from 1 through 9 {
		& > div:nth-child(#{$i}) {
			background-color: nth($color-arr, $i);
		}
	}
}
</style>
