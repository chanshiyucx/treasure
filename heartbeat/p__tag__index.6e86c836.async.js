(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{A6DT:function(e,t,a){"use strict";var i=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("pVnL")),r=l(a("MVZn")),s=i(a("MebM")),o=a("MuoO"),d=l(a("LvDl")),c=l(a("dnEz")),p=l(a("UbMB")),u=a("Kvkj"),f=l(a("20nU")),g=l(a("Gt7H")),h=f.default.gitalkOption,m=f.default.tagsOption,v=f.default.themeColors,_=m.enableGitalk,b=m.qoute,E=p.default.bind(g.default),k=d.default.shuffle(v);class P extends s.PureComponent{constructor(e){super(e),this.filterPost=(e=>{this.props.dispatch({type:"app/filterPost",payload:{type:"labels",filter:e}}).then(t=>{var a=t.slice(0,this.state.pageSize),i=Math.ceil(t.length/this.state.pageSize);this.setState({filterTitle:e,filterPost:t,currList:a,page:1,maxPage:i})}).catch(console.error)}),this.clearFilter=(()=>{this.setState({filterTitle:"",filterPost:[],currList:[],page:1,maxPage:1})}),this.prev=(()=>{var e=this.state,t=e.filterPost,a=e.page,i=e.pageSize,l=a-1,n=t.slice((l-1)*i,(a-1)*i);this.setState({currList:n,page:l})}),this.next=(()=>{var e=this.state,t=e.filterPost,a=e.page,i=e.pageSize,l=a+1,n=t.slice(a*i,l*i);this.setState({currList:n,page:l})}),this.renderGitalk=(()=>{_&&!this.state.renderGitalk&&(setTimeout(()=>{var e=new c.default((0,r.default)({},h,{title:"\u6807\u7b7e"}));e.render("gitalk")},100),this.setState({renderGitalk:!0}))}),this.state={showLoading:!0,renderGitalk:!1,filterTitle:"",filterPost:[],currList:[],pageSize:10,page:1,maxPage:1}}componentDidMount(){this.props.dispatch({type:"app/queryTags"})}componentWillReceiveProps(e){!e.loading&&e.tags.length&&this.setState({showLoading:!1})}componentWillUnmount(){this.props.dispatch({type:"app/updateState",payload:{tags:[]}})}render(e,t){var a=e.tags,i=e.loading,l=t.showLoading,r=t.filterTitle,o=t.currList,d=t.page,c=t.maxPage;return s.default.createElement("div",{class:E("container")},s.default.createElement(u.Transition,{visible:!i&&!l,animation:"drop",duration:600,onShow:this.renderGitalk},s.default.createElement("div",{class:E("body")},s.default.createElement(u.Quote,{text:b}),s.default.createElement("div",{class:E("content")},a.map((e,t)=>{var a=k[t%k.length];return s.default.createElement("button",{key:t,style:{color:a},onClick:()=>this.filterPost(e.name)},e.name)})),s.default.createElement(u.Transition,{visible:o.length,animation:"fade down",duration:600},s.default.createElement("div",{class:E("filter-post")},s.default.createElement("div",null,s.default.createElement("span",null,"Tag:"),s.default.createElement("button",{class:E("menu-btn"),onClick:this.clearFilter},r,s.default.createElement("i",{class:"icon"},"\ue806"))),s.default.createElement("div",{class:E("content")},o.map((e,t)=>{var a=k[t];return s.default.createElement(u.Archive,(0,n.default)({key:t,color:a},e))})),s.default.createElement(u.Pagination,{prev:this.prev,next:this.next,page:d,maxPage:c}))))),_&&s.default.createElement("div",{id:"gitalk"}),l&&s.default.createElement(u.Loading,{className:E("loading")}))}}var y=(0,o.connect)(e=>{var t=e.app,a=e.loading;return{tags:t.tags,loading:a.effects["app/queryTags"]}})(P);t.default=y},Gt7H:function(e,t,a){e.exports={container:"container___2KIO-",body:"body___3qzk9",content:"content___3-3es","filter-post":"filter-post___2-alI","menu-btn":"menu-btn___eyLrQ",loading:"loading___OtrtN"}}}]);