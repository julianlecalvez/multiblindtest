<template>
	<div :class="classes">
		<label v-if="canGuess" for="trackName" class="label">Guess a track :</label>
		<input v-if="canGuess" ref="input" type="text" placeholder="title OR artist..." v-model="guess" class="input dark" id="trackName" @keyup.enter="onSubmitGuess()" autocomplete="off">
		<div class="actions">
			<Button @click="onShowAnswers()" class="showAnswers" :icon="require('@/assets/icons/show.svg')" data-tooltip="Show answers" big v-if="canGuess" />
			<Button @click="onShareList()" class="showAnswers" :icon="require('@/assets/icons/share.svg')" data-tooltip="Share current tracks" big />
			<Button :to="{name:'home'}" class="showAnswers" :icon="require('@/assets/icons/home.svg')" data-tooltip="Back home" big />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Inject, Model, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import Button from './Button.vue';
import gsap from 'gsap';

@Component({
	components:{
		Button,
	}
})
export default class TrackAnswerForm extends Vue {

	@Prop({default:true})
	public canGuess:boolean;

	public guess:string = "";
	public error:boolean = false;

	public get classes():string[] {
		let res = ["trackanswerform"]
		if(this.error) res.push("error");
		return res;
	}

	public mounted():void {
		
	}

	public beforeDestroy():void {
		
	}

	public shake():void {
		this.error = true;
		gsap.to(this.$refs.input, {duration:.05, left:"-10px", repeat:5, ease:"Sine.easeInOut", onComplete:()=> {
			this.error = false
		}}).yoyo(true);
	}

	public shine():void {
		this.guess = "";
		gsap.set(this.$refs.input, {filter:"brightness(1)"});
		gsap.from(this.$refs.input, {duration:.25, filter:"brightness(2)", ease:"Sine.easeOut"});
	}

	public onSubmitGuess():void {
		this.$emit("guess", this.guess);
	}

	public onShowAnswers():void {
		this.$emit("showAnswers");
	}

	public onShareList():void {
		this.$emit("share");
	}

}
</script>

<style scoped lang="less">
@import (reference) '../less/_includes.less';
.trackanswerform{
	display: flex;
	flex-direction: column;

	&.error {
		.input {
			background-color: @mainColor_warn;
			color: #fff;
		}
	}

	.label {
		font-weight: bold;
		font-size: 20px;
		margin-bottom: 5px;
	}

	.input {
		margin-bottom: 10px;
		position: relative;
		transition: background-color .25s, color .25s;
	}

	.showAnswers {
		align-self: center;
	}

	.actions {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		&>*:not(:last-child) {
			margin-right: 10px;
		}
	}
}
</style>