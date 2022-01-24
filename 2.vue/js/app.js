import SearchModel from '../js/models/SearchModel.js'
import KeywordModel from '../js/models/KeywordModel.js'
import HistoryModel from '../js/models/HistoryModel.js'


new Vue({
    el: '#app',
    data: {
        query: '',
        searchResult: [],
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '',
        keywords: [],
        history : []
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword()
        this.fethcHistory()
    },
    methods: {
        onSubmit(e) {            
            this.search()
        },

        onKeyup() {
            if(!this.query.length) this.onReset()
        },
        onReset() {
            this.query = ''
            this.searchResult = [];
            this.submitted = false
        },
        onClickTab(tab) {
            this.selectedTab =tab
        },
        onClickKeyword(keyword) {
            this.query = keyword
            this.search()  
        },
        onClickRemoveHistory(keyword) {
            HistoryModel.remove(keyword)
            this.fethcHistory()
        },
        fethcHistory() {
            HistoryModel.list().then(data => {
                this.history =data
            })
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywords =data
            })
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted =true
                this.searchResult = data
            })

            HistoryModel.add(this.query)
            this.fethcHistory()
        },
        
    }
})