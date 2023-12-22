<template>
	<div class="flex h-full">
		<n-card class="rounded-10px shadow-sm h-full m-1 w1/4">
			<n-space vertical>
				<n-gradient-text> center 中心点 </n-gradient-text>
				<n-tabs type="segment" @update:value="pointChange" :default-value="0">
					<n-tab-pane
						v-for="(point, index) in pointList"
						:name="index"
						:tab="point.location"
					>
					</n-tab-pane>
				</n-tabs>
				<n-gradient-text> zoom 缩放 </n-gradient-text>
				<n-slider
					v-model:value="zoom"
					:default="8.7"
					:step="0.1"
					:min="3.0"
					:max="18.0"
					:marks="{ 8.7: '默认值', 11: '挺好' }"
					@update:value="zoomChange"
				/>
				<n-input-number
					@update:value="zoomChange"
					:min="3.0"
					:max="18.0"
					v-model:value="zoom"
					size="small"
				/>
				<n-gradient-text> mapStyle 地图样式 </n-gradient-text>
				<n-switch
					v-model:value="mapStyle"
					size="large"
					checked-value="light"
					unchecked-value="dark"
					@update:value="mapStyleChange"
				>
					<template #checked-icon> 🌝 </template>
					<template #unchecked-icon> 🌚 </template>
				</n-switch>
				<n-gradient-text> AMap.plugin 地图插件 </n-gradient-text>
				<n-checkbox-group
					v-model:value="plugins"
					@update:value="checkedPlugins"
				>
					<n-space vertical>
						<n-checkbox value="scale" label="比例尺" />
						<n-checkbox value="toolBar" label="工具条" />
						<n-checkbox value="controlBar" label="工具条方向盘" />
						<n-checkbox value="hawkEye" label="小地图" />
					</n-space>
				</n-checkbox-group>
			</n-space>
		</n-card>
		<div class="rounded-10px shadow-sm h-full m-1 w3/4 overflow-hidden">
			<div class="h-full w-full" id="map"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

const map = ref(null);

/**
 * 初始化地图
 * @params {[number, number]} center 地图默认中心点 默认北京故宫
 * @params {number} zoom 地图缩放比例 默认 8.7 范围 [2-30]
 * @params {string} mapStyle 地图样式 高德开放平台-控制台-GeoHUB定制地图-自定义地图 可自定义
 *
 */

const initMap = () => {
	map.value = new AMap.Map("map", {
		center: [120.15, 30.24],
		zoom: 8.7,
		mapStyle: "amap://styles/normal",
	});
};

const plugins = ref(["scale", "toolBar", "controlBar", "hawkEye"]);

const checkedPlugins = (val) => {
	plugins.value.forEach((p) => {
		if (val.includes(p)) {
			controlPluginList[p].show();
		} else {
			controlPluginList[p].hide();
		}
	});
};

const zoom = ref(8.7);

const zoomChange = (val) => {
	map.value.setZoom(val);
};
/**
 *  AMap.plugin 异步加载多个插件 亦可同步加载
 * @see https://lbs.amap.com/api/javascript-api/guide/abc/plugins
 *
 * 插件列表
 * @see https://lbs.amap.com/api/javascript-api-v2/guide/abc/plugins-list
 *
 */
const controlPluginList = reactive({});

const controlPlugin = () => {
	AMap.plugin(
		[
			"AMap.Scale",
			"AMap.ToolBar",
			"AMap.ControlBar",
			"AMap.HawkEye",
			"AMap.MapType",
			"AMap.Geolocation",
		],
		() => {
			controlPluginList.scale = new AMap.Scale();
			controlPluginList.controlBar = new AMap.ControlBar({
				position: {
					top: "10px",
					left: "10px",
				},
			});
			controlPluginList.toolBar = new AMap.ToolBar({
				position: {
					top: "110px",
					left: "40px",
				},
			});
			controlPluginList.hawkEye = new AMap.HawkEye({
				opened: false,
			});
			controlPluginList.mapType = new AMap.MapType({
				defaultType: 0,
			});
			controlPluginList.geolocation = new AMap.Geolocation({
				position: {
					left: "10px",
					bottom: "60px",
				},
			});
		},
	);
};

const pointList = [
	{
		location: "杭州西湖",
		position: [120.15, 30.24],
	},
	{
		location: "北京故宫",
		position: [116.4, 39.92],
	},
	{
		location: "冰雪大世界",
		position: [126.56, 45.78],
	},
];

const pointChange = (val) => {
	map.value.setCenter(pointList[val].position);
};

const mapStyle = ref("light");

const mapStyleChange = (type) => {
	if (type === "dark") {
		map.value.setMapStyle("amap://styles/dark");
	} else {
		map.value.setMapStyle("amap://styles/normal");
	}
};

onMounted(() => {
	initMap();
	controlPlugin();
	map.value.addControl(controlPluginList.scale);
	map.value.addControl(controlPluginList.toolBar);
	map.value.addControl(controlPluginList.controlBar);
	map.value.addControl(controlPluginList.hawkEye);
	map.value.addControl(controlPluginList.mapType);
	map.value.addControl(controlPluginList.geolocation);
});
</script>

<style>
.amap-ctrl-list-layer {
	color: #000;
}
</style>

