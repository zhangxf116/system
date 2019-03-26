import html from './index.html';
import {mapState, mapActions} from 'vuex';
import {isEmpty, handlePageChange} from '@/kit/common';
import {pageSizes} from '@/kit/data.js';

export default {
  template: html,
   props:['unclaime','getunclaimedlistnotice',],
	data() {
		return {
            pageSizes: pageSizes,
            disabled:false,
            pagingData:{
                from: '',
                to: '',
                user_name: '',
                user_cellphone: '',
                page_no: 1,
                page_size: 20,
            },
            loading: false
         }
	},
	methods: {
    ...mapActions(['UNCLAIMED_LIST','CLAIM_SUCCESS']),
    unclaimedNotice() {
        this.loading = true;
        let params = {};
        for(let i in this.pagingData) {
            if (!isEmpty(this.pagingData[i])) {
                params[i] = this.pagingData[i];
            }
        }
        let payload = {
            params: params,
            headers: {
                Authorization: 'Basic d2ViLWFwcDo='
            }
        };
        this.UNCLAIMED_LIST(payload).then(res => { 
            this.loading = false;
        });
    },
    search(form) {
        this.$refs[form].validate((valid) => {
            if (valid) {
                this.pagingData.page_no = 1;
                this.unclaimedNotice();
            } else {
                return false;
            }
        });
    },
    reset(form) {
        this.$refs[form].resetFields();
        this.pagingData.page_no = 1;
        this.unclaimedNotice();
    },
    handlePageChange,
    handleunclaimed(row){
      let that = this;
      that.disabled = true;
      let body ={
        userId: row.userId
      }
      that.CLAIM_SUCCESS({body: body, headers: {Authorization: 'Basic d2ViLWFwcDo='}}).then(res => { 
        if (res === '0') {
            that.$message({
              message: '认领成功',
              type: 'success'
            });
            that.unclaimedNotice();
            that.getunclaimedlistnotice()
            that.disabled = false;
		    }else{
                that.disabled = false;
                that.unclaimedNotice();
                that.getunclaimedlistnotice()
            }
		  });
    }
	},
	mounted() {
	
	}
}