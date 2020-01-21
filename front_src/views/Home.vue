<template>
	<div class="home">
		<div class="holder">
			<img src="@/assets/icons/home_logo.svg" alt="logo" class="logo">

			<div class="head">
				<h1>Multiblind Test</h1>
				<p class="light">- try not to vomit -</p>
				<p class="subtitle">It's like playing <strong>{{tracksCount}}</strong> simultaneous blind tests, it's awful.</p>
				<!-- <p>Connect with spotify, select some playlists to pick song from and try to guess all the songs between the 5 playing at the same time.<br />Everytime you find an answer, the song is paused to help you find the others.</p> -->
			</div>

			<Button title="Connect with Spotify" :to="{name:'redirect', query:{uri:authUrl}}" :icon="require('@/assets/icons/spotify.svg')" class="connect" big />
		</div>
		<div class="footer">
			Coded by <a href="https://www.durss.ninja" target="_blank">Durss</a>.<br />
			Based on <a href="https://www.youtube.com/watch?v=_dN0DpE0q3E" target="_blank">an idea</a> from <a href="https://twitter.com/navo_" target="_blank">Navo</a> & <a href="https://twitter.com/kyank" target="_blank">Kyan Khojandi</a>.
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Inject, Model, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import Button from '../components/Button.vue';
import SpotifyAPI from '../utils/SpotifyAPI';
import Config from '../utils/Config';

@Component({
	components:{
		Button,
	}
})
export default class Home extends Vue {

	@Prop()
	public from:string;

	public get authUrl():string {
		if(this.from) {
			localStorage.setItem("redirect", this.from);
		}
		return SpotifyAPI.instance.getAuthUrl();
	}

	public get tracksCount():number {
		return Config.TRACKS_COUNT;
	}

	public mounted():void {
		
	}

	public beforeDestroy():void {
		
	}

}
</script>

<style scoped lang="less">
@import (reference) '../less/_includes.less';
.home{
	.holder {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		.center();
		transform: translate(-50%, -60%);
	
		.head {
			margin-bottom: 30px;
			&>* {
				margin-bottom: 10px;
			}
			.light {
				opacity: .5;
				font-style: italic;
				text-align: center;
				margin-top: -15px;
			}
			.subtitle {
				margin-top: 20px;
			}
		}
	
		.logo {
			max-height: 200px;
			margin-bottom: 30px;
		}
	
		.connect {
			margin: auto;
			font-size: 20px;
		}
	}

	.footer {
		position: fixed;
		bottom: 5px;
		left: 0;
		text-align: center;
		width: 100%;
		font-style: italic;
	}
}
</style>