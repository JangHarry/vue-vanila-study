import FormView from "../views/FormView.js"
import ResultView from "../views/ResultView.js"
import TabView from '../views/TabView.js'
import KeywordView from "../views/KeywordView.js"
import HistoryView from "../views/HistoryView.js"

import SearchModel from "../models/SearchModel.js"
import KeywordModel from "../models/KeywordModel.js"
import HistoryModel from "../models/HistoryModel.js"


const tag = '[MainController]'


export default {
    init() {        
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm())
        
        ResultView.setup(document.querySelector('#search-result'))

        TabView.setup(document.querySelector('#tabs')).on('@change', e => this.onChangeTab(e.detail.tabName))

        KeywordView.setup(document.querySelector('#search-keyword')).on('@click',e=>this.onClickKeyword(e.detail.keyword))

        HistoryView.setup(document.querySelector('#search-history')).on('@click', e => this.onClickHistory(e.detail.keyword))
        .on('@remove', e => this.onRemoveHistory(e.detail.keyword))
        this.selectedTab = '추천 검색어'        
        this.renderView()
    },

    renderView() {
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)
        
        if (this.selectedTab === '추천 검색어') {
            this.fetchSearchKeyWord()
            HistoryView.hide()
        } else {
            this.fetchSearchHistory()
            KeywordView.hide()
        }
        
        ResultView.hide()

    },
    fetchSearchHistory() {
        HistoryModel.list().then(data => {            
            HistoryView.render(data).bindRemoveBtn()
        })
    },
    fetchSearchKeyWord() {
        KeywordModel.list().then(data => {                
                KeywordView.render(data)
            })  
    },

    search(query) {
        FormView.setValue(query)
        SearchModel.list(query).then(data => {            
            this.onSearchResult(data)
        })

        this.onAddHistroy(query)
        
    },

    onSubmit(input) {
        console.log(tag,'onSubmit()', input)
        this.search(input)
    },

    onResetForm() {
        this.renderView()
        //ResultView.hide()
        //this.onSearchResult(false)
    },

    onSearchResult(data) {
        TabView.hide()
        KeywordView.hide()
        HistoryView.hide()
        ResultView.render(data)
    },

    onChangeTab(tabName) {        
        this.selectedTab = tabName
        this.renderView()
    },

    onClickKeyword(keyword) {        
        this.search(keyword)
    },

    onClickHistory(keyword) {
        this.search(keyword)
    },

    onRemoveHistory(keyword) {        
        HistoryModel.remove(keyword)
        this.renderView()
    },

    onAddHistroy(keyword) {        
        HistoryModel.add(keyword)        
    }

    
}