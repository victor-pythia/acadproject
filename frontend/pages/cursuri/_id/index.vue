<template>
<div>
    <section v-if="curs" class="container">
    <div class="has-text-centered ttl">
        <router-link class="title is-1 ttl" :to="{path: 'view'}" append> {{curs.nume}}</router-link>
    </div>

      <article class="has-text-justified des">
          <p>
              {{curs.descriere}}
          </p>
      </article>

    <h2 class="title is-3 cvi">Ce vei invata: </h2>

    <section>
        <b-steps v-model="activeStep" :has-navigation="false">
            <template v-for="(step, index) in ['fizica', 'matematica', 'cuantica','mecanica']">
                <b-step-item
                    v-if="step"
                    :key="index"
                    :clickable="true"
                    :visible="true"
                    :label="step"
                    >
                </b-step-item>
            </template>
        </b-steps>
    </section>

    <div class="middle">
        <b-button v-if="this.curs.creator == this.$auth.user._id" @click="sterge()">Sterge curs</b-button>
    </div>
  </section>

    <div class="chaptername">
        <h1 class="title is-5 cvi">{{chapterName ? chapterName : "DEMO"}}</h1>
    </div>

    <section class="video">
        <video-player autoplay 
                    v-if="curs" class="video-player-box"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true">
        </video-player>
    </section>

    <Chapters
    v-if="chapters"
    :chapters="chapters"
    v-on:insertChapter="insertChapter($event)"
    v-on:viewChapter="viewChapter($event)"
    />
</div> 
</template>

<script>
export default {
    layout: "CursLayout",
    data() {
        return {
            activeStep: 0,
            curs: null,
            playerOptions: null,
            chapters: null,
            chapterName: null
        }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    mounted(){
        this.$axios.get(`/curs/${this.$route.fullPath.split('/')[2]}`).then((res)=>{
            console.log(res.data);
            this.curs = res.data;
            //let cvi = res.data.ce_vei_invata.split('*');
            //cvi.pop();
            //this.curs.ce_vei_invata = cvi;
            this.playerOptions = {
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: "video/mp4",
                    src: `http://localhost:5002/curs/video/${this.curs.linkDemo}`
                }],
            }
            this.chapters = this.curs.chapters
        })

    },
    methods: {
        playerReady(player) {
            player.play();
        },
        sterge() {
            this.$axios.delete(`/curs/${this.curs.id}`);
            this.$router.push('/');
        },
        insertChapter(chapter){
            console.log("primesc in index: ", chapter);
            this.chapters.push(chapter);
        },
        viewChapter(chapter){
            console.log("ma uit la: ", chapter, `http://localhost:5002/curs/video/${chapter.linkVideo}`);
            this.chapterName = chapter.nume
            this.player.src({type: 'video/mp4', src: `http://localhost:5002/curs/video/${chapter.linkVideo}`})
        }

    }
}
</script>

<style>
    .h1 {
        font-weight: bold;
        text-align: center;
    }

    .ttl {
        margin-top: 1rem;
        margin-bottom: .5rem;
    }

    .des {
        padding-top: .5rem;
        padding-bottom: .5rem;
        background-color: rgb(250, 240, 251);
        border-radius: 1rem;
    }

    .cvi {
        padding-left: 2rem;
        padding-top: 2rem; 
    }

    .content {
        padding-left: 4rem;
    }
    .video {
        display: flex;
        justify-content: center;
    }
    .middle{
        display: flex;
        justify-content: center;
        justify-items: center;
        padding-top: 2rem;
        padding-bottom: 4rem;
    }
    .chaptername{
        display: flex;
        justify-content: center;
        justify-items: center;
        padding-bottom: 1rem;
    }
    
</style>