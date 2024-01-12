<template>
	<div class="flex h-full">
		<n-card class="rounded-10px shadow-sm h-full m-1 w2/5">
			<div class="gridContainer h-full">
				<div>
					<img @click="imgClick" src="~@/assets/demo/dominantColor_0.png" />
				</div>
				<div>
					<img @click="imgClick" src="~@/assets/demo/dominantColor_1.png" />
				</div>
				<div>
					<img @click="imgClick" src="~@/assets/demo/dominantColor_2.jpeg" />
				</div>
			</div>
		</n-card>
		<n-card
			class="flex justify-center items-center rounded-10px shadow-sm h-full m-1 w3/5 overflow-hidden"
		>
			<div class="dominantColorBox rounded-10px">
				<div
					v-for="item in color"
					:style="{ background: `rgb(${item[0]}, ${item[1]}, ${item[2]})` }"
					@click="copyHandler(`rgb(${item[0]}, ${item[1]}, ${item[2]})`)"
				>
					<span>{{ `rgb(${item[0]}, ${item[1]}, ${item[2]})` }}</span>
				</div>
			</div>
		</n-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useMessage } from 'naive-ui'

import { prominent } from "@/utils/common/imgColor";

import { copyToClipboard } from "@/utils/common/copyToClipboard";

const color: any = ref([]);

const imgClick = async (e: MouseEvent) => {
	const res = await prominent(e.target as HTMLImageElement, {
		amount: 4
	});
	color.value = res;
};

const message = useMessage()

const copyHandler = async (text: string) => {
	let flag = await copyToClipboard(text);
	if (flag) {
		message.success("复制成功 " + text);
	} else {
		message.error("复制失败 " + text);
	}
};

</script>
<style lang="scss" scoped>
.gridContainer {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 10px;
	& > div {
		border: 1px solid #646cff;
		border-radius: 4px;
		overflow: hidden;
		cursor: pointer;
		img {
			height: 100%;
			object-fit: cover;
			opacity: 0.9;
			transition: all 1s;
		}
		&:hover img {
			opacity: 1;
			transform: scale(1.1);
		}
	}
}
.dominantColorBox {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 400px;
	border-radius: 10px;
	overflow: hidden;
	cursor: pointer;
	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	& > div:nth-child(1) {
		height: 50% !important;
	}
	& > div:not(:nth-child(1)) {
		flex: 1;
	}
	span {
		font-size: 20px;
		mix-blend-mode: difference;
	}
}
</style>
