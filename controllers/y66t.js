const service = require('./../models/y66t')
const base = require('../utils/base')
const request = require('request')
const channals = require('../channals')
const cats = [
  
]

const channal = 'y66t'

module.exports = {

  async list(ctx) {
    let result = {
      status: 0,
      data: null,
    }

    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    result.data = data

    result.count = data.length

    ctx.body = result

  },

  async listPage(ctx){
    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    await ctx.render('index',{
      data , page:parseInt(page) , cat , cats , channal , channals
    })
  },

  async detail(ctx){
    let result = {
      status: 0,
      data: null,
    }
    let {id} = ctx.params
    let data = await service.detail(id)
    result.data = data
    ctx.body = result

  },

  async detailPage(ctx){
    let {id} = ctx.params
    let proxy = ctx.query.p == 1
    let index = parseInt(ctx.query.r || '0')

    let data = await service.detail(id)
    let url = index < data.source.length ? data.source[index].url : ''
    if(proxy) url = '/api/proxy/play/' + base.base64_encode(url)
    await ctx.render('detail',{
      data , proxy , index , url
    })

  }
}