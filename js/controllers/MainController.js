import FormView from "../views/FormView.js"
import ResultView from "../views/ResultView.js"
import TabView from '../views/TabView.js'
import KeywordView from "../views/KeywordView.js"

import SearchModel from "../models/SearchModel.js"
import KeywordModel from "../models/KeywordModel.js"

const tag = '[MainController]'


export default {
    init() {        
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())
        
        ResultView.setup(document.querySelector('#search-result'))

        TabView.setup(document.querySelector('#tabs')).on('@change', e => this.onChangeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword')).on('@click',e=>this.onClickKeyword(e.detail.keyword))

        this.selectedTab = '추천 검색어'        
        this.renderView()
    },

    renderView() {
        TabView.setActiveTab(this.selectedTab)
        
        if (this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyWord()          
        } else {
            
        }
        
        ResultView.hide()

    },

    fetchSearchKeyWord() {
        KeywordModel.list().then(data => {                
                KeywordView.render(data)
            })  
    },

    search(query) {
        console.log(tag, 'search()', query)
        SearchModel.list(query).then(data => {            
            this.onSearchResult(data)
        })
        
    },

    onSubmit(input) {
        console.log(tag,'onSubmit()', input)
        this.search(input)
    },

    onResetForm() {
        ResultView.hide()
        //this.onSearchResult(false)
    },

    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        ResultView.render(data)
    },

    onChangeTab(tabName) {
        console.log(tabName)
    },

    onClickKeyword(keyword) {        
        this.search(keyword)
    }
    
}