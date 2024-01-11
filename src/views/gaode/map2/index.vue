<template>
	<div class="flex h-full">
		<n-card class="rounded-10px shadow-sm h-full m-1 w1/4">
			<n-space vertical>
				<n-gradient-text> 一个最基本的点 </n-gradient-text>
				<n-button @click="addDefaultMarker">添加</n-button>
				<n-gradient-text> 自定义图标点 </n-gradient-text>
				<n-button @click="addCustomMarker">添加</n-button>
				<n-gradient-text> 自定义 css 样式点 </n-gradient-text>
				<n-button @click="addCssCustomMarker">添加</n-button>
				<n-gradient-text> 为图标点添加label文本表示 </n-gradient-text>
				<n-button @click="addLabelForDefaultMarker">添加</n-button>
				<n-gradient-text> 小Demo </n-gradient-text>
				<n-button @click="addDemo">展示我的资产</n-button>
			</n-space>
		</n-card>
		<div class="rounded-10px shadow-sm h-full m-1 w3/4 overflow-hidden">
			<div class="h-full w-full" id="map"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import vue_logo from "@/assets/gaode/vue_logo.png";
import car from "@/assets/gaode/car.png";
const map = ref(null);

console.log(car);

const initMap = () => {
	map.value = new AMap.Map("map");
};

/**
 * 覆盖物移动到视野内
 * setFitView(overlays, immediately, avoid, maxZoom)
 * @param {*} overlays 单个或者多个覆盖物 多个为数组
 * @param {Boolean} immediately 是否立即过渡 将覆盖物展示到视野内的动画过度效果
 * @param {Array} avoid [60,60,60,60]) 四周边距，上、下、左、右
 * @param {Number} maxZoom 默认放大到最大
 */

const mapSetFitView = (overlays = []) => {
	map.value.setFitView(overlays, false, [100, 100, 100, 100], 14);
};

const marker = reactive({
	defaultMarker: null,
	defaultMarkerLabel: null,
	customMarker: null,
	cssMarker: null,
	demo: null,
});

// 基础点 默认蓝色小icon
const addDefaultMarker = () => {
	if (marker.defaultMarker) {
		mapSetFitView(marker.defaultMarker);
		return;
	}
	marker.defaultMarker = new AMap.Marker({
		position: [116.4, 39.92],
	});
	map.value.add(marker.defaultMarker);
	mapSetFitView(marker.defaultMarker);
};

const addCustomMarker = () => {
	if (marker.customMarker) {
		mapSetFitView(marker.customMarker);
		return;
	}
	marker.customMarker = new AMap.Marker({
		position: [116.35668, 39.907128],
		icon: new AMap.Icon({
			image: vue_logo,
			size: new AMap.Size(40, 40),
			imageSize: new AMap.Size(40, 40),
		}),
		label: {
			content: "基础的图标点label",
		},
		anchor: "bottom-center",
	});
	let dot = new AMap.Marker({
		position: [116.35668, 39.907128],
		content: '<div class="marker-default"></div>',
	});
	map.value.add([marker.customMarker, dot]);
	mapSetFitView(marker.customMarker);
};

const addCssCustomMarker = () => {
	if (marker.cssMarker) {
		mapSetFitView(marker.cssMarker);
		return;
	}
	marker.cssMarker = new AMap.Marker({
		position: [116.19412, 39.982095],
		content: '<div class="dot"></div>',
	});
	map.value.add(marker.cssMarker);
	mapSetFitView(marker.cssMarker);
};

const addLabelForDefaultMarker = () => {
	addDefaultMarker();
	marker.defaultMarker.setLabel({
		content: "这是一个maker的文本描述",
		direction: "bottom",
	});
};

const addMarker = (markerList) => {
	let markerArr = [];

	markerList.forEach((item) => {
		let mk = new AMap.Marker({
			position: [item.lng, item.lat],
			content: `
				<div class='markerIcon'>
					<img src='${car}' style='transform: rotate(${item.direction || 0}deg)' />
				</div>`,
			label: {
				content: `
				<div class='markerLabel'>
					<span class='plateNumber'> ${item.plateNumber} </span>
					<span class='driver'> ${item.driver} </span>
				</div>`,
			},
			anchor: "bottom-center",
		});
		markerArr.push(mk);
	});

	return markerArr;
};

let ajaxRes = [
	{
		id: 1,
		direction: 45,
		plateNumber: "浙A 00000",
		driver: "张三",
		lng: 121.502505,
		lat: 31.232898,
	},
	{
		id: 2,
		direction: 90,
		plateNumber: "鸡A 2.5",
		driver: "鸡哥",
		lng: 121.500253,
		lat: 31.233273,
	},
];

const addDemo = () => {
	let arr = addMarker(ajaxRes);
	map.value.add(arr);
	mapSetFitView(arr);
};

onMounted(() => {
	initMap();
});
</script>

<style>
.marker-default {
	width: 5px;
	height: 5px;
	background-color: red;
	border-radius: 50%;
}

.dot {
	width: 40px;
	height: 40px;
	position: relative;
}

.dot::before,
.dot::after {
	content: "";
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: red;
	position: absolute;
	left: 0;
	top: 0;
}

.dot::before {
	animation: kf 1s linear infinite;
}

.dot::after {
	animation: kf 2s linear infinite;
}

@keyframes kf {
	0% {
		transform: scale(0);
		opacity: 1;
	}

	100% {
		transform: scale(1);
		opacity: 0;
	}
}


.markerIcon {
	display: flex;
	width: 42px;
	height: 42px;
}
.markerIcon img {
	width: 20px;
	height: 42px;
	margin: auto;
}
.amap-marker-label {
	border: 0;
  background-color: transparent;
}
.markerLabel {
	padding: 5px;
	line-height: 16px;
	font-size: 12px;
	color: #000;
	border: 1px solid  #63e2b7;
	background-color: #fff;
	border-radius: 4px;
	box-shadow:  0 2px 0 rgba(5, 145, 255, 0.1);
}
.markerLabel .driver {
	color: #63e2b7;
}
.markerLabel .plateNumber {
	cursor: pointer;
}
</style>
