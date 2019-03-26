import html from './index.html';
import {mapState, mapActions} from 'vuex';
import unclaimed from './unclaimed/index';//未认领
import claimed from './claimed/index';//已经认领
import complete from './complete/index'; //已经完成
import unconnected from './unconnected/index';//未接通
export default {
    template: html,
    computed: {
      ...mapState({
        unclaime: state => state.ReturnVisit.unclaime,
        claim: state => state.ReturnVisit.claimedList,
        complete: state => state.ReturnVisit.completeList,
        notices: state => state.ReturnVisit.notices
      })
    },
    components: {
       unclaimed: unclaimed,
       claimed: claimed,
       complete:complete,
       unconnected:unconnected
    },
  	data() {
      return {
        isshow:"0",
        pagingData:{
          page_no: 1,
          page_size: 20,
        },
        claimPagingdata:{
          status: 1,
          page_no: 1,
          page_size: 20,
        },
        complePagingdata:{
          status: 3,
          page_no: 1,
          page_size: 20,
        },
        usernoticed:{
          status: 5,
          connect_status:0,
          page_no: 1,
          page_size: 20,
        }
      }
    },
    methods: {
    ...mapActions(['UNCLAIMED_LIST','CLAIMED_LIST','COMPLETELIST','NOTICES']),
    getunclaimedlistnotice(){
      this.getClaimedList()
    },
    getunclaimedlist(){
        let payload = {
        params: this.pagingData,
        headers: {
            Authorization: 'Basic d2ViLWFwcDo='
        }
    };
      this.UNCLAIMED_LIST(payload)
    },
    getClaimedList(){
      let payload = {
      params: this.claimPagingdata,
      headers: {
          Authorization: 'Basic d2ViLWFwcDo='
      }
  };
    this.CLAIMED_LIST(payload)
  },
  getcompletelist(){
    let payload = {
      params: this.complePagingdata,
      headers: {
          Authorization: 'Basic d2ViLWFwcDo='
    }
  };
    this.COMPLETELIST(payload)
  },
  handchence(e){
  this.isshow = e.index
  if(this.isshow==2){
    this.usernotices();
  }
  },
  usernotices(){
    let payload = {
      params: this.usernoticed,
      headers: {
          Authorization: 'Basic d2ViLWFwcDo='
    }
  };
    this.NOTICES(payload)
  },
	},
	beforeMount() {
    this.getunclaimedlist();
    this.getClaimedList();
    this.getcompletelist();
    this.usernotices();
	}
}