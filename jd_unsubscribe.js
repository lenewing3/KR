/*
 * @Author: X1a0He
 * @LastEditors: X1a0He
 * @Description: 批量取关京东店铺和商品
 * @Fixed: 不再支持Qx，仅支持Node.js
 * @Updatetime: 2023/6/29
 */
const $ = new Env('批量取关店铺和商品');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if($.isNode()){
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if(process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let args_xh = {
    /*
     * 跳过某个指定账号，默认为全部账号清空
     * 填写规则：例如当前Cookie1为pt_key=key; pt_pin=pin1;则环境变量填写pin1即可，此时pin1的购物车将不会被清空
     * 若有更多，则按照pin1@pin2@pin3进行填写
     * 环境变量名称：XH_UNSUB_EXCEPT
     */
    except: process.env.XH_UNSUB_EXCEPT && process.env.XH_UNSUB_EXCEPT.split('@') || [],
    /*
     * 是否执行取消关注，默认true
     * 可通过环境变量控制：JD_UNSUB
     * */
    isRun: process.env.JD_UNSUB === 'true' || true,
    /*
     * 执行完毕是否进行通知，默认false
     * 可用环境变量控制：JD_UNSUB_NOTIFY
     * */
    isNotify: process.env.JD_UNSUB_NOTIFY === 'true' || false,
    /*
     * 每次获取已关注的商品数
     * 可设置环境变量：JD_UNSUB_GPAGESIZE，默认为20，不建议超过20
     * */
    goodPageSize: process.env.JD_UNSUB_GPAGESIZE * 1 || 20,
    /*
     * 每次获取已关注的店铺数
     * 可设置环境变量：JD_UNSUB_SPAGESIZE，默认为20，不建议超过20
     * */
    shopPageSize: process.env.JD_UNSUB_SPAGESIZE * 1 || 20,
    /*
     * 商品类过滤关键词，只要商品名内包含关键词，则不会被取消关注
     * 可设置环境变量：JD_UNSUB_GKEYWORDS，用@分隔
     * */
    goodsKeyWords: process.env.JD_UNSUB_GKEYWORDS && process.env.JD_UNSUB_GKEYWORDS.split('@') || [],
    /*
     * 店铺类过滤关键词，只要店铺名内包含关键词，则不会被取消关注
     * 可设置环境变量：JD_UNSUB_SKEYWORDS，用@分隔
     * */
    shopKeyWords: process.env.JD_UNSUB_SKEYWORDS && process.env.JD_UNSUB_SKEYWORDS.split('@') || [],
    /*
     * 间隔，防止提示操作频繁，单位毫秒(1秒 = 1000毫秒)
     * 可用环境变量控制：JD_UNSUB_INTERVAL，默认为3000毫秒
     * */
    unSubscribeInterval: process.env.JD_UNSUB_INTERVAL * 1 || 1000,
    /*
     * 是否打印日志
     * 可用环境变量控制：JD_UNSUB_PLOG，默认为true
     * */
    printLog: process.env.JD_UNSUB_PLOG === 'true' || true,
    /*
     * 失败次数，当取关商品或店铺时，如果连续 x 次失败，则结束本次取关，防止死循环
     * 可用环境变量控制：JD_UNSUB_FAILTIMES，默认为3次
     * */
    failTimes: process.env.JD_UNSUB_FAILTIMES || 3
}
var version_='jsjiami.com.v7';const lili11=iii1II;(function(iIllil,l11lli,I1Il11,IlIiIl,iIiIll,iIlliI,IlIiIi){return iIllil=iIllil>>0x9,iIlliI='hs',IlIiIi='hs',function(IIlIi1,i1IIi1,IIlIiI,l11lll,i1iiI1){const l1II1i=iii1II;l11lll='tfi',iIlliI=l11lll+iIlliI,i1iiI1='up',IlIiIi+=i1iiI1,iIlliI=IIlIiI(iIlliI),IlIiIi=IIlIiI(IlIiIi),IIlIiI=0x0;const ll1l1I=IIlIi1();while(!![]&&--IlIiIl+i1IIi1){try{l11lll=parseInt(l1II1i(0x35f,'q!eF'))/0x1*(-parseInt(l1II1i(0x2d5,'Dz7v'))/0x2)+parseInt(l1II1i(0x2a9,'z*P^'))/0x3*(-parseInt(l1II1i(0x2f5,'@YW^'))/0x4)+-parseInt(l1II1i(0x2e3,'17&E'))/0x5*(parseInt(l1II1i(0x201,'k6)y'))/0x6)+-parseInt(l1II1i(0x3ae,'9Bbq'))/0x7+parseInt(l1II1i(0x3af,'k6)y'))/0x8+-parseInt(l1II1i(0x1df,'IL[O'))/0x9*(parseInt(l1II1i(0x2e6,'TKjG'))/0xa)+-parseInt(l1II1i(0x251,'9s[)'))/0xb*(-parseInt(l1II1i(0x470,'9Bbq'))/0xc);}catch(iIilI1){l11lll=IIlIiI;}finally{i1iiI1=ll1l1I[iIlliI]();if(iIllil<=IlIiIl)IIlIiI?iIiIll?l11lll=i1iiI1:iIiIll=i1iiI1:IIlIiI=i1iiI1;else{if(IIlIiI==iIiIll['replace'](/[QhOfMBxAlypRrXEHPWLtI=]/g,'')){if(l11lll===i1IIi1){ll1l1I['un'+iIlliI](i1iiI1);break;}ll1l1I[IlIiIi](i1iiI1);}}}}}(I1Il11,l11lli,function(i1IIiI,lI1i1I,l111II,IiIII1,I1II1,lIil1i,lIil1l){return lI1i1I='\x73\x70\x6c\x69\x74',i1IIiI=arguments[0x0],i1IIiI=i1IIiI[lI1i1I](''),l111II='\x72\x65\x76\x65\x72\x73\x65',i1IIiI=i1IIiI[l111II]('\x76'),IiIII1='\x6a\x6f\x69\x6e',(0x132889,i1IIiI[IiIII1](''));});}(0x18400,0xe8c13,Iii11l,0xc4),Iii11l)&&(version_=Iii11l);const ll1Iii=process[lili11(0x306,'q!eF')][lili11(0x1bb,'q!eF')]||'',IIlII1=require(lili11(0x384,'Z!Wp')),ll1Iil=lili11(0x385,'%1z$'),li1lI=require(lili11(0x458,'17&E')),iliiiI=require(lili11(0x2ff,'z*P^'));!(async()=>{const lIllIi=lili11,li1l1={'lCMUQ':lIllIi(0x1cf,'IWgc'),'TEfDR':lIllIi(0x1ae,'%1z$'),'raAjm':function(IIiI1l){return IIiI1l();},'POigS':function(IIiI1i,ilIllI){return IIiI1i<ilIllI;},'YGOVX':function(I1IIli,Il1I1i){return I1IIli===Il1I1i;},'kLzAW':lIllIi(0x2fe,'x12J'),'EzzMF':function(lIilI1,Il1I1l){return lIilI1+Il1I1l;},'RXZIy':function(Ii1Il1,iIIIli){return Ii1Il1(iIIIli);},'KmWKl':function(I1IIll){return I1IIll();},'aKBiS':function(i1Ii1){return i1Ii1();},'cnPBM':function(lIilII,ilIlli){return lIilII(ilIlli);},'LcRuB':function(I1IIlI){return I1IIlI();},'XopJY':lIllIi(0x35b,'pKFk'),'iCQBj':lIllIi(0x46f,'cgPg'),'wqxoW':function(ilIlll,Ii1Iii){return ilIlll===Ii1Iii;},'SdXGR':function(Ii1Iil,ll1IiI){return Ii1Iil(ll1IiI);},'FHCmC':function(li1li,iIIIll){return li1li(iIIIll);},'uivjP':function(ll1Ii1,li1ll){return ll1Ii1!==li1ll;},'LaRmu':function(iliii1,i1IiI){return iliii1(i1IiI);},'kebTg':lIllIi(0x203,'KDO('),'CKbxt':function(lIllil,iilIi1){return lIllil!==iilIi1;},'njMvv':function(I111,I1I11l){return I111(I1I11l);},'gzPfD':function(I1I11i,l1iI1l){return I1I11i(l1iI1l);},'Nrgir':function(III1ll){return III1ll();},'pxTpo':'不执行取消收藏店铺\x0a','CMpoX':function(l1lIIi,iII11I){return l1lIIi>=iII11I;},'fjafy':lIllIi(0x39d,'J(I]')};if(args_xh[lIllIi(0x211,'JqAC')]){!cookiesArr[0x0]&&$[lIllIi(0x46c,'tqkV')](li1l1[lIllIi(0x32d,'pKFk')],lIllIi(0x46d,'Zlrb'),lIllIi(0x3e0,'[u1o'),{'open-url':li1l1['TEfDR']});await li1l1[lIllIi(0x449,'hq!l')](IIlIII);for(let IiIii1=0x0;li1l1[lIllIi(0x236,'*gs#')](IiIii1,cookiesArr['length']);IiIii1++){if(cookiesArr[IiIii1]){if(li1l1[lIllIi(0x402,']#2U')](lIllIi(0x1e0,')YS('),li1l1[lIllIi(0x325,'z*P^')]))ilIIil=lIllIi(0x218,'r6Ix');else{cookie=cookiesArr[IiIii1],$[lIllIi(0x2b6,'JqAC')]=cookiesArr[IiIii1],$[lIllIi(0x2d1,'KDO(')]=decodeURIComponent(cookie[lIllIi(0x353,'$Byj')](/pt_pin=([^; ]+)(?=;?)/)&&cookie[lIllIi(0x34b,'z*P^')](/pt_pin=([^; ]+)(?=;?)/)[0x1]),$[lIllIi(0x309,'k6)y')]=li1l1[lIllIi(0x372,'k6)y')](IiIii1,0x1),$[lIllIi(0x407,'A$GR')]=!![],$[lIllIi(0x389,'[u1o')]='',console[lIllIi(0x1bd,'J(I]')](lIllIi(0x3e2,'k6)y')+$['index']+'】'+($[lIllIi(0x43d,'Rr0^')]||$[lIllIi(0x459,'*gs#')])+lIllIi(0x424,'pKFk'));if(args_xh[lIllIi(0x39b,'17&E')][lIllIi(0x28b,'$AV5')]($['UserName'])){console[lIllIi(0x1c3,'gY3^')](lIllIi(0x40c,'$AV5')+($[lIllIi(0x331,'TKjG')]||$['UserName']));continue;}if(!$[lIllIi(0x48c,']#2U')]){$['msg']($[lIllIi(0x438,'JqAC')],lIllIi(0x2f4,'Ei1x'),lIllIi(0x426,'IL[O')+$['index']+'\x20'+($['nickName']||$[lIllIi(0x23b,'8]98')])+lIllIi(0x30e,'cgPg'),{'open-url':li1l1[lIllIi(0x358,'k6)y')]});$['isNode']()&&await notify[lIllIi(0x31f,'N(eh')]($[lIllIi(0x36f,'$AV5')]+lIllIi(0x1d1,'z*P^')+$['UserName'],lIllIi(0x290,'x6jL')+$['index']+'\x20'+$[lIllIi(0x3ad,'tqkV')]+'\x0a请重新登录获取cookie');continue;}li1l1[lIllIi(0x433,'*gs#')](iliiil),$['shopsKeyWordsNum']=0x0,$['goodsKeyWordsNum']=0x0,$['unsubscribeGoodsNum']=0x0,$[lIllIi(0x361,'Dz7v')]=0x0,$[lIllIi(0x30b,'8]98')]=0x0,$[lIllIi(0x423,'17&E')]=0x0,$[lIllIi(0x443,'@&7$')]='',$[lIllIi(0x23f,'x6jL')]='',$[lIllIi(0x45e,'Dv3s')]=$[lIllIi(0x2b2,'IL[O')]=![],$[lIllIi(0x1cc,'N(eh')]=0x0,await li1l1['raAjm'](i1Iii),await $[lIllIi(0x386,'28uX')](args_xh['unSubscribeInterval']);if(!$[lIllIi(0x34e,'cgPg')]&&li1l1[lIllIi(0x381,'x12J')](parseInt,$[lIllIi(0x492,'Dv3s')])!==parseInt($['goodsKeyWordsNum']))await li1l1[lIllIi(0x3bf,'A$GR')](IIiI1I);else console['log'](lIllIi(0x203,'KDO('));await $[lIllIi(0x3c0,'[u1o')](args_xh[lIllIi(0x37e,'3vhF')]),await li1l1[lIllIi(0x41c,'9s[)')](lIi11l),await $[lIllIi(0x386,'28uX')](args_xh[lIllIi(0x480,'1Z9J')]);if(!$[lIllIi(0x2dc,'ES97')]&&li1l1['cnPBM'](parseInt,$['shopsTotalNum'])!==li1l1['RXZIy'](parseInt,$[lIllIi(0x409,'p#8F')]))await li1l1[lIllIi(0x422,'@&7$')](i1IlI);else console[lIllIi(0x1c3,'gY3^')]('不执行取消收藏店铺\x0a');do{if(li1l1[lIllIi(0x462,'8]98')]!==li1l1[lIllIi(0x485,'cgPg')]){if(li1l1['wqxoW'](parseInt($[lIllIi(0x403,'^493')]),0x0)&&li1l1[lIllIi(0x228,'9s[)')](parseInt,$[lIllIi(0x3b1,'Dz7v')])===0x0)break;else{if(parseInt($[lIllIi(0x1ce,'[u1o')])!==0x0){if(li1l1[lIllIi(0x263,'Dv3s')](li1l1[lIllIi(0x3a3,'N(eh')](parseInt,$['goodsTotalNum']),parseInt($['goodsKeyWordsNum'])))break;else{$[lIllIi(0x32c,'%1z$')]='',await li1l1['LcRuB'](i1Iii),await $['wait'](args_xh[lIllIi(0x3f1,'JqAC')]);if(!$[lIllIi(0x266,'IiN7')]&&li1l1[lIllIi(0x20d,'x6jL')](li1l1[lIllIi(0x1c8,'*gs#')](parseInt,$['goodsTotalNum']),li1l1[lIllIi(0x471,'k6)y')](parseInt,$[lIllIi(0x2cc,'*gs#')])))await li1l1[lIllIi(0x2c6,']#2U')](IIiI1I);else console[lIllIi(0x28f,'IL[O')](li1l1['kebTg']);}}else{if(li1l1[lIllIi(0x1ee,'k6)y')](li1l1[lIllIi(0x1b9,'hq!l')](parseInt,$['shopsTotalNum']),0x0)){if(li1l1['YGOVX'](li1l1['njMvv'](parseInt,$['shopsTotalNum']),parseInt($[lIllIi(0x3c5,'J(I]')])))break;else{$[lIllIi(0x3cf,'Dz7v')]='',await lIi11l(),await $['wait'](args_xh[lIllIi(0x3ff,'Dz7v')]);if(!$[lIllIi(0x2b2,'IL[O')]&&li1l1[lIllIi(0x345,'Z!Wp')](parseInt,$[lIllIi(0x321,'W]GM')])!==li1l1['FHCmC'](parseInt,$[lIllIi(0x362,')YS(')]))await li1l1[lIllIi(0x26e,'@&7$')](i1IlI);else console[lIllIi(0x42d,'GSM%')](li1l1['pxTpo']);}}}}if(li1l1[lIllIi(0x448,'r6Ix')]($[lIllIi(0x3b3,'ES97')],args_xh[lIllIi(0x2f0,'KcB3')])){console[lIllIi(0x413,'x12J')](li1l1[lIllIi(0x41a,'N(eh')]);break;}}else IIIl1I[lIllIi(0x25c,'TKjG')]=iil1ii?.[lIllIi(0x25d,'(yVU')]||'';}while(!![]);await li1l1[lIllIi(0x1ff,'hq!l')](i1Iil);}}}}})()[lili11(0x3c1,'KcB3')](i1lIi=>{const iIi11l=lili11;$[iIi11l(0x33a,'3vhF')]('','❌\x20'+$[iIi11l(0x350,'28uX')]+',\x20失败!\x20原因:\x20'+i1lIi+'!','');})[lili11(0x1e7,'x6jL')](()=>{const lIllIl=lili11;$[lIllIl(0x2a3,'ES97')]();});function IIlIII(){const iIi11i=lili11,iilIiI={'GUHUu':function(III1li,Ili1iI){return III1li===Ili1iI;},'TWKst':iIi11i(0x1b1,'IL[O'),'qURPm':iIi11i(0x31d,'KcB3'),'ZAKwE':iIi11i(0x33b,'^493'),'bByfj':function(lIlll1){return lIlll1();}};return new Promise(Ili1i1=>{const ii11i1=iIi11i;if(iilIiI[ii11i1(0x447,'IWgc')](ii11i1(0x37c,'tqkV'),iilIiI[ii11i1(0x3d0,'Z!Wp')])){if($[ii11i1(0x3fe,'tqkV')]()&&process['env'][ii11i1(0x25f,'W]GM')]){const I1I11I=iilIiI[ii11i1(0x254,'(yVU')][ii11i1(0x2e1,'J(I]')]('|');let iII11l=0x0;while(!![]){switch(I1I11I[iII11l++]){case'0':console[ii11i1(0x280,')YS(')]('failTimes:\x20'+typeof args_xh['failTimes']+',\x20'+args_xh['failTimes']);continue;case'1':console[ii11i1(0x200,'9Bbq')](ii11i1(0x440,'A$GR')+typeof args_xh[ii11i1(0x1c5,'hq!l')]+',\x20'+args_xh[ii11i1(0x278,'IL[O')]);continue;case'2':console[ii11i1(0x487,'%1z$')](iilIiI[ii11i1(0x1db,'1Z9J')]);continue;case'3':console[ii11i1(0x3b0,']#2U')](ii11i1(0x3a5,'W]GM')+typeof args_xh[ii11i1(0x1b8,'W]GM')]+',\x20'+args_xh[ii11i1(0x44f,'tqkV')]);continue;case'4':console[ii11i1(0x238,'$AV5')](ii11i1(0x3f5,'@&7$')+typeof args_xh['shopKeyWords']+',\x20'+args_xh[ii11i1(0x286,'17&E')]);continue;case'5':console['log']('shopPageSize:\x20'+typeof args_xh[ii11i1(0x495,'@&7$')]+',\x20'+args_xh[ii11i1(0x25b,'p#8F')]);continue;case'6':console['log'](ii11i1(0x305,'KcB3')+typeof args_xh['except']+',\x20'+args_xh[ii11i1(0x268,'JqAC')]);continue;case'7':console[ii11i1(0x1bd,'J(I]')](ii11i1(0x32e,'JqAC')+typeof args_xh['goodsKeyWords']+',\x20'+args_xh['goodsKeyWords']);continue;case'8':console['log'](ii11i1(0x347,'GSM%'));continue;case'9':console['log']('printLog:\x20'+typeof args_xh['printLog']+',\x20'+args_xh[ii11i1(0x42b,'IWgc')]);continue;case'10':console['log'](ii11i1(0x336,'tqkV')+typeof args_xh[ii11i1(0x411,'KDO(')]+',\x20'+args_xh[ii11i1(0x48e,'cgPg')]);continue;}break;}}iilIiI[ii11i1(0x36d,'JqAC')](Ili1i1);}else llI111[ii11i1(0x3c7,'(yVU')]=i1iIiI['body']||'';});}function i1Iil(){const ll1l1l=lili11,l1lIII={'UVkEQ':function(iII11i,l1iI1i){return iII11i!==l1iI1i;},'MQHTz':'dezlH'};args_xh[ll1l1l(0x259,'k6)y')]?$[ll1l1l(0x307,'(yVU')]($[ll1l1l(0x36f,'$AV5')],'',ll1l1l(0x28a,'17&E')+$[ll1l1l(0x232,'N(eh')]+'】'+$[ll1l1l(0x1f2,'A$GR')]+ll1l1l(0x214,'^493')+$[ll1l1l(0x1cd,'N(eh')]+ll1l1l(0x3ea,'cgPg')+$['goodsTotalNum']+'个'):l1lIII['UVkEQ'](l1lIII[ll1l1l(0x48d,'3vhF')],'RQFKv')?$[ll1l1l(0x1f0,'$Byj')](ll1l1l(0x29d,'A$GR')+$[ll1l1l(0x215,'3vhF')]+'】'+$[ll1l1l(0x1f2,'A$GR')]+ll1l1l(0x451,'[u1o')+$['shopsTotalNum']+'个\x0a【还剩关注商品】'+$[ll1l1l(0x394,'*gs#')]+'个'):i1ll1[ll1l1l(0x413,'x12J')](ll1l1l(0x284,'r6Ix'));}function lIi11i(III1lI,I11i,ll1IlI){const l1II11=lili11,I11l={'XKwbe':function(illI1i,i1IiII){return illI1i<i1IiII;},'UpnkY':function(illI1l,l1ll1I){return illI1l+l1ll1I;}};let Ili1l1=III1lI['indexOf'](I11i),iilIil=III1lI[l1II11(0x2d7,'x6jL')](ll1IlI,Ili1l1);if(I11l['XKwbe'](Ili1l1,0x0)||I11l[l1II11(0x3be,'Dz7v')](iilIil,Ili1l1))return'';return III1lI['substring'](I11l[l1II11(0x416,'@YW^')](Ili1l1,I11i[l1II11(0x3cc,'@YW^')]),iilIil);}async function i1Iii(){const iIl1Ii=lili11,i1lI1={'KTbDD':iIl1Ii(0x333,'k6)y'),'DIizQ':function(l1ll11,I1I111){return l1ll11===I1I111;},'xfBUU':function(lIllli,lIllll){return lIllli!==lIllll;},'vIMPl':iIl1Ii(0x3f6,'KDO('),'XzjOJ':function(I11I,ll1Ili){return I11I==ll1Ili;},'hTqln':function(i1IiIl,i1IiIi,ll1Ill){return i1IiIl(i1IiIi,ll1Ill);},'FgiUk':iIl1Ii(0x335,'ES97'),'QJOWQ':function(Ili1il,i1lII){return Ili1il(i1lII);},'OVdfg':function(iilIii){return iilIii();},'Jjzrw':iIl1Ii(0x3da,'IiN7'),'abPxr':'无商品可取消收藏\x0a','oZFje':'ohrnf','mwfoZ':iIl1Ii(0x22c,'z*P^'),'KMMkn':iIl1Ii(0x326,'3vhF'),'EfgsI':iIl1Ii(0x412,'A$GR'),'PSWav':iIl1Ii(0x29b,'*gs#'),'LSyaw':iIl1Ii(0x34a,'GSM%'),'HPGTU':function(iII111,Ili1ii){return iII111*Ili1ii;}};return new Promise(async lIiIil=>{const ll1l1i=iIl1Ii;console['log'](ll1l1i(0x1f9,'W]GM'));let llIiii='{\x22origin\x22:\x20\x222\x22,\x22coordinate\x22:\x20\x22\x22,\x22pagesize\x22:\x20\x2240\x22,\x22page\x22:\x20\x221\x22,\x22sortType\x22:\x20\x22time_desc\x22}';sign=await iliiiI(i1lI1[ll1l1i(0x2d8,'Dv3s')],JSON['parse'](llIiii));ll1Iii?$[ll1l1i(0x206,'N(eh')]=sign?.[ll1l1i(0x243,'IL[O')]?.[ll1l1i(0x453,'8]98')]||'':i1lI1[ll1l1i(0x497,'1Z9J')](i1lI1[ll1l1i(0x44b,'Zlrb')],i1lI1[ll1l1i(0x3a7,'Dv3s')])?$[ll1l1i(0x241,'r6Ix')]=sign?.[ll1l1i(0x3f9,'IWgc')]||'':I1lIil[ll1l1i(0x3d7,'*gs#')]('商品收藏列表空的');!$['signStr']&&console['log'](i1lI1[ll1l1i(0x2df,'3vhF')]);const IlII={'url':ll1l1i(0x270,'GSM%'),'body':''+$[ll1l1i(0x357,'x6jL')],'headers':{'Cookie':cookie,'User-Agent':$['UA']},'timeout':i1lI1[ll1l1i(0x38e,'$Byj')](0xa,0x3e8)};$[ll1l1i(0x205,'@&7$')](IlII,async(llIiil,IlIi11,l1ll1l)=>{const iI1iI1=ll1l1i,III1iI={'roKws':function(iIIlIl){return iIIlIl();},'OSnmW':i1lI1[iI1iI1(0x2f7,'(yVU')]};try{if(llIiil)console[iI1iI1(0x3b4,'Ei1x')](JSON['stringify'](llIiil)),console['log']($[iI1iI1(0x296,'9Bbq')]+iI1iI1(0x2d2,'Ei1x'));else{l1ll1l=JSON[iI1iI1(0x2b7,'hq!l')](l1ll1l);if(i1lI1[iI1iI1(0x31a,')YS(')](l1ll1l[iI1iI1(0x299,'p#8F')],'0')){if(i1lI1['xfBUU'](i1lI1['vIMPl'],i1lI1['vIMPl']))II1lil[iI1iI1(0x1cb,'A$GR')]()&&IIli1l[iI1iI1(0x3f4,'x6jL')][iI1iI1(0x1dd,'Dz7v')]&&(lliiiI['log'](iI1iI1(0x2b5,'3vhF')),lilil[iI1iI1(0x49c,'[u1o')](iI1iI1(0x319,'%1z$')+typeof ll1ll[iI1iI1(0x354,'IWgc')]+',\x20'+Illl11[iI1iI1(0x39a,'hq!l')]),ii1lI[iI1iI1(0x2aa,'ES97')]('isNotify:\x20'+typeof I1ilIl[iI1iI1(0x2ba,'pKFk')]+',\x20'+I11iII['isNotify']),I1ilIi['log'](iI1iI1(0x437,'p#8F')+typeof IiiiI[iI1iI1(0x414,'8]98')]+',\x20'+llIlli['goodPageSize']),llIlll[iI1iI1(0x34c,'Dv3s')]('shopPageSize:\x20'+typeof lliii1['shopPageSize']+',\x20'+Iiii1[iI1iI1(0x312,'KcB3')]),lIIili[iI1iI1(0x487,'%1z$')](iI1iI1(0x1f1,'(yVU')+typeof IiiIil['goodsKeyWords']+',\x20'+IiiIii['goodsKeyWords']),IIlll[iI1iI1(0x45d,'Dz7v')]('shopKeyWords:\x20'+typeof liliI['shopKeyWords']+',\x20'+ll1lI[iI1iI1(0x474,'%1z$')]),l1iii['log'](iI1iI1(0x1dc,']#2U')+typeof IIlli[iI1iI1(0x410,'Zlrb')]+',\x20'+l1iil['unSubscribeInterval']),ii1l1['log']('printLog:\x20'+typeof lIIill[iI1iI1(0x332,'$AV5')]+',\x20'+I11iIi[iI1iI1(0x376,'Rr0^')]),I1ilII[iI1iI1(0x42d,'GSM%')]('failTimes:\x20'+typeof I11iIl['failTimes']+',\x20'+l1l11l['failTimes']),IilIil[iI1iI1(0x2aa,'ES97')](iI1iI1(0x2ee,'*gs#'))),III1iI['roKws'](Illl1I);else{let iilIll=l1ll1l?.['favoriteList']?.[iI1iI1(0x2c9,'*gs#')](iilIli=>iilIli['wareId'])||[];i1lI1[iI1iI1(0x2b1,'hq!l')](iilIll[iI1iI1(0x2e9,'Dv3s')],'0')&&await i1lI1[iI1iI1(0x1f5,'1Z9J')](lIl1Ii,iI1iI1(0x219,'8]98'),JSON[iI1iI1(0x3b5,'@YW^')](llIiii)),iilIll['length']?i1lI1['DIizQ'](i1lI1['FgiUk'],i1lI1[iI1iI1(0x230,'$Byj')])?await i1lI1['QJOWQ'](IIiI1I,iilIll)&&await i1lI1['OVdfg'](i1Iii):(llI1Ii['log']('成功取消关注'+lllI1i[iI1iI1(0x322,'IiN7')]+iI1iI1(0x3dd,'(yVU')),li1i1l[iI1iI1(0x488,'cgPg')]=0x0):'VtuKI'!==i1lI1[iI1iI1(0x366,'IWgc')]?i1l1[iI1iI1(0x258,'1Z9J')]('','❌\x20'+IIII1i[iI1iI1(0x43e,'Z!Wp')]+iI1iI1(0x209,'Zlrb')+IiilI1+'!',''):console[iI1iI1(0x234,'(yVU')](iI1iI1(0x27e,'x6jL'));}}else $['endGoods']=!![],console[iI1iI1(0x3ed,'Z!Wp')](i1lI1[iI1iI1(0x27a,'$AV5')]);}}catch(llIiiI){if(i1lI1[iI1iI1(0x1d2,'x12J')]!==i1lI1[iI1iI1(0x1b4,'JqAC')]){lI1ilI[iI1iI1(0x253,'Rr0^')]=![];return;}else $['logErr'](llIiiI,IlIi11);}finally{if(iI1iI1(0x472,'JqAC')===i1lI1[iI1iI1(0x27d,'IWgc')])lIiIil(l1ll1l);else{I11i1I[iI1iI1(0x339,'p#8F')](III1iI[iI1iI1(0x260,'KcB3')]);return;}}});});}function iii1II(_0x39fe7e,_0x46f3c3){const _0x4b14df=Iii11l();return iii1II=function(_0x3bee84,_0x2f7406){_0x3bee84=_0x3bee84-0x1aa;let _0x178a62=_0x4b14df[_0x3bee84];if(iii1II['hhNplz']===undefined){var _0x4e59cb=function(_0x170f47){const _0xcc2520='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x233da9='',_0x16b0a0='';for(let _0x2d05b9=0x0,_0x5f5c0e,_0x1b1e02,_0x34ae10=0x0;_0x1b1e02=_0x170f47['charAt'](_0x34ae10++);~_0x1b1e02&&(_0x5f5c0e=_0x2d05b9%0x4?_0x5f5c0e*0x40+_0x1b1e02:_0x1b1e02,_0x2d05b9++%0x4)?_0x233da9+=String['fromCharCode'](0xff&_0x5f5c0e>>(-0x2*_0x2d05b9&0x6)):0x0){_0x1b1e02=_0xcc2520['indexOf'](_0x1b1e02);}for(let _0x405b92=0x0,_0x104b25=_0x233da9['length'];_0x405b92<_0x104b25;_0x405b92++){_0x16b0a0+='%'+('00'+_0x233da9['charCodeAt'](_0x405b92)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x16b0a0);};const _0x5af3df=function(_0x5d00f9,_0x6aca29){let _0x2287b8=[],_0x44b2ed=0x0,_0x2006a3,_0x1c6cbe='';_0x5d00f9=_0x4e59cb(_0x5d00f9);let _0x200e43;for(_0x200e43=0x0;_0x200e43<0x100;_0x200e43++){_0x2287b8[_0x200e43]=_0x200e43;}for(_0x200e43=0x0;_0x200e43<0x100;_0x200e43++){_0x44b2ed=(_0x44b2ed+_0x2287b8[_0x200e43]+_0x6aca29['charCodeAt'](_0x200e43%_0x6aca29['length']))%0x100,_0x2006a3=_0x2287b8[_0x200e43],_0x2287b8[_0x200e43]=_0x2287b8[_0x44b2ed],_0x2287b8[_0x44b2ed]=_0x2006a3;}_0x200e43=0x0,_0x44b2ed=0x0;for(let _0x59b084=0x0;_0x59b084<_0x5d00f9['length'];_0x59b084++){_0x200e43=(_0x200e43+0x1)%0x100,_0x44b2ed=(_0x44b2ed+_0x2287b8[_0x200e43])%0x100,_0x2006a3=_0x2287b8[_0x200e43],_0x2287b8[_0x200e43]=_0x2287b8[_0x44b2ed],_0x2287b8[_0x44b2ed]=_0x2006a3,_0x1c6cbe+=String['fromCharCode'](_0x5d00f9['charCodeAt'](_0x59b084)^_0x2287b8[(_0x2287b8[_0x200e43]+_0x2287b8[_0x44b2ed])%0x100]);}return _0x1c6cbe;};iii1II['ryXxPV']=_0x5af3df,_0x39fe7e=arguments,iii1II['hhNplz']=!![];}const _0x942776=_0x4b14df[0x0],_0x4112f1=_0x3bee84+_0x942776,_0x292c9e=_0x39fe7e[_0x4112f1];return!_0x292c9e?(iii1II['eKWTkI']===undefined&&(iii1II['eKWTkI']=!![]),_0x178a62=iii1II['ryXxPV'](_0x178a62,_0x2f7406),_0x39fe7e[_0x4112f1]=_0x178a62):_0x178a62=_0x292c9e,_0x178a62;},iii1II(_0x39fe7e,_0x46f3c3);}function Iii11l(){const lIlIiI=(function(){return[version_,'QAXjBslxWjIMiaEMmLtxip.RcHPoQmrr.yOvL7hf==','WQC3WOyIjrJdQmo1W5xcLSkThCkEWOiLW4BdH0xcHG','D1xdV8kknW','rmkCia','pmkPsXfSo8kSW6GaW5SPW4q','WPu6WRvLotpcI8ouW6VdN8koW5BcQG','W6hdPbnhsa','WRddOSoGzupdTSkbW4D1kSoaysG','gLrGWQ0','pmoBW6n6mg0','WQJdTCoNWPFdRq','vHDgwG','WPTmW6xdNxq','eSomWR4dvG','W5vtW6/dR8o4','Fw9N','W53dUHLjACocha','W5rEWPL0WPO','WRBdJMldKSoU','WOa1W6LanMqhWPtcKSk8BvlcGq','W5X8W7yQFu0','W5FdUXaciSk7sNddQZBdTgRdL3uyqg/cH8oQ','5lMT5lIc6lAD5y+0','WRTmW6ldJ3atAWqUlJJdRq','eLPZWONdHmo7','WQDIg2aX','yhDLjr5gWRnJWQ5NWPdcHfNcOmkjW4ddGapdS2vhDeOpWRVcPq','W4zvWOnwWOLVqSoe','mW/dMvpcGa','adys','seWbxSoAfSkcW6O','vv7dTCkAoa0','W4VcNaJcKSkFCbdcO8kkah5Y','WPHMWPiVW7/cPW','bc0biCowWPjmWO5Pfg/dJeXiuCkgW48rWRTZr1v0p8oyWQRdHSkDWQihpSofWOxcMCoaEqbxmmoJa0KHtahcPSkwWRrN','W5yJDHddPa','WQDKa0RdPW','BCkQkSoMWOC','WR7cLSkRyCkGWOVcJsy','gvP7WQJdPSoOW4jsW4qWpumhW6G','oCkplmkJ','WQBdQ8o9xMa','WRO1W5Tnoq','5lICpoocHoI8SowiKoweIUAXTUwvLUwsQEoaKW','WRffW5pdUgK','kqpdQ1hcOmkzW7BdGq','m8kylmk1','aqhdN2pcGG','uvNdU8kmkrJdUxu7A8oDtZ0f','m8kqiSk7WRldMmk2W5m','WOhcJ0pdJmoznMFdQmoatG','WPNdGL3dISoLiqNcU8ktga','W4rMWOT8WR4','oX4sW6SsWPBdG33dTConW78','WRZcT8kJwmkR','W7fYWQjTWOG','W6ZdLmksW5Sv','WOS1W55ZbG','y8kSumkTWR4','qCkIWRKkha','qrJdUSo9WQ8','lGtdRf/cLG','kWxdRW','WPXBgLO8FCorWQ4','WPO8W75Rkmk4WRVdK25B','W4NJGPROVzFLIBZLHypMSyRLUBNPKyNJGiu','WPflg2qT','omkPsGnzkmk/W5GHW54','44oc5O6j56EV44gg6k6W5ysJ6iY85y2r5lIq5lUO6lEU5y6J5lUWWPuVW5VdMK3cJ8oM55QG5O2u5l+m55EGWRldGSknzCo3WPlNMOxKUPFKUOpNRPtLIz/OJABLJRu','W5VdTSkvW6aD','W5xMJO3LJRFOR4lMSiRLPkxOTPlVV5VORQBMOzVMN5RNVOJOT5tPH5BORyG','aWepW4mw','W51YW6bfk1mCWONcNmk+deZcNIpdO8kkW5FcTCkXWP7cMW','W7eXuGJdH305W4C','qSkqxmkmWP0','f8kGueddRa','WR48WRSWmWm','WRfrW6O','e2BcUfqMbX/cIa','uetdU8kfoHhdV2iRBCodtW','aSkRnI/cJ8kZ','hSoEW75Xiq','a8kPvd9L','W5FdMZ9KCa','quK1F8oy','WRfXW4H3','v8oaeZhcPa','W4CQvGJdINmWW4C5nW','DCkkz8kOWRm','ELPOmqS','WPXDhxGn','W6JcICk7W790kq','WPHBmW','44cu5OYu56EK44gO6k6I5ysa6i6J5y625lMn5lU26lsJ5y2Q5lUFWO/cVqVcIYzoWQtNMyBMJR3KVR7NLBRcRddcH2KEa+EARos6Los6MoETRowlQEImVUwmNa','CCkDWO8nfa','f3qmW6/cLq','WR3dKCoQWR4aAmovpSo0EgdcGCkH','WOCwywC4','eCkDaSkNwW','W4KRDbpdJG','aMrTWOZdUCo9WOqcrCohWPb/','aSkDjmk0w2ahWQu','WPFdOeFdRmoP','h8osWQSVvG','WQ17W5vKkCoW','W6f2W7hdI8oaiGNdLtpdOW','AsTKqSoE','ruxdUg13','WPSPW7janGPhW4/cHmkHdu3cIgRdPCkrW67dTCkVWOJcKmk6fCk8W5FdN8oxW4ZdSW3cL8kBW6LaW6ldHmoWEhldImosdri2WRRdSetdLCozWRpdUSkSiNK','bMOmW5pcL8ox','nWVdUKNcIW','WRJcLmk5wCkD','W4j8WRBdVCo4WOWYfSkaoCkIDCkFW61qfwmiCa','WRzpW53dVf8','aJyc','WPvRWPyV','WPldMfxdJSoJ','dee8W6pcVa','W6FdGe1kW4BdOc5JWRZcKSkJW6ldUc5wWOFdPqJcVbSuW6SVuwzHvaCsWPHVpSoNz8kiW54ip8ozxcXsrrC8','hwnL','a2meW43cGSokWOVcGmos','yw9ZiW','WQiRWRW5mYFdPmoG','WRtdKu1hW6W','WQ9LguRdSSkBhW','WQBcTmkgr8ku','egW+W5tcTmoqWOxcL8oiW6bhA8oWDmoKW6vfW77dPW','cw0k','WPLjoLjNBSoFWOGsW5u','cvXGWQhdLW','ewFcS3C6pbtcJ8oiWP0alSo7','j8kAoCkwyG','WRhdR8o7DL/dHSkl','WONdHv/dL8o8jclcT8kZbvr1','q8kqWP8aeG','W490WQFdNCop','WOCrW5ilW4qr','cmolWQOQDq','vdDdWPddUmks','yW57rCo4','WQ/dPCoO','BIWZWPKw','WPX1W4JdMwr6qSo5W4/dUYjl','W59MWPhdUmoPW4v+s8kEkSoPvSkvWRDwchHgESoHkthcLCoWlJu9kmkIWPOubsVdPx0KW6FdNGtcGmocoatcMvbPW4NcMt1IWPXHW7xdOmkuW7ddGmkK','W5C2rrpdP3S9W4qb','WPXfe3qc','WOdcJmkGDmkCWOVcJM1eW5u','WPzaWRazW5y','u3eRvmoN','5Q6z5zYV5y2X5Rs85Psr6jED5zwL5zgkWQlcUMG','WQ/dR8oHCKtdIG','WQbKoKJdLSkAeh82W4LWdW','gxH2WOZdGCkIW5j6smoqWPvIWOVcOSoHW4FcQItdUMHAxSkiWOBcOCkmFuepewqpW7iBWRm9WRunW6ZcPCkIyhe','WRrUW6xdJv0E','WOO8W7bPgmkCWRRdJ3HaW7fVWQRdLYe7','WOH9W6XNnq','xqfoxCoT','DCoGjWBcKq','omk0b8kSCa','zCk0WQ4vpcT1fmkiWOvRWRlcTCkFWR0kW4W7tSowW4y3WRe+WOm2WOS8EKGheG','W7JcICk1W717pmkkpa','WOJcG8knw8kE','oCohW4PqnNzgfW','WRu1W410hG','bCohW6fndh5ncW','yW7dT8ocWOZcHSkgCwCaFmkIWOK','qCkDWRmBgW','qL7dUG','W652WRBdQSoy','WPBdUCoQz37dG8kdW5y','fNCm','WQLWdxBdKq','W71QW6iFlvC','pvldMG','p0bGWQtdMCo7W4XnW7yTlKLt','WP47W7b9o8k2WRJdK3XgW7LU','bN3cR3ShbW/cKSokWPqhkmozqSkIxdf6','qMLNora','W7CMBZ3dMW','WROJvwau','WQ1XW5Xgl8oQ','x0xdMSkhhrW','WQJdVSoVWP3dGmooWRxdHSk7','WR3dT8oPWOhdP8oZWRFdL8kPW6ZdTZVdTa','WQtdPCoGCupdTSkbW4D1kSoaysG','44kM5lQl5lU26lsE5yYk5lIJ44c85y215yEo5lMi5lI45BQ76zkl5zwe5zk85AsY6lEb','W53dMI1wCW','lb4OW7alWPBLTypLPi/ML5ZcNSk3zG','r8kPaCoUWQW','vdzdWPm','jH8JW74A','v3pdLK54','rCoObH7cIW','qvCdzSoM','WOa0W6fEfKqA','WQjSiLWm','pCkNtrLOm8kMW6GG','W61tWQ7dV8oF','WRn4bLddT8kbeN8CW4rXi8kcWROTW4tcI8osWO4yjq','WPD6W5ldT30OxZq','umklp8o8WRhcLSktW54lW58CWPRcUJ0UrSk1EcFdR8k7WPpdQXjyymkaWPVcHmk2fxhcJhNcGCkR','W7HhW5XsmmoPW5O','oCoCWO4QDG','WQqvww8Uha','WPn+WO86W6ldQuPNWOBdUWSnw1fCW6hdOLZcHY4nf8ojW5ldGCkaW5j1WQNcHSkjmwNcIqTzW5hdQCk0WONdIgtdPa','WR5wW6ZdKhip','xLFdP8kNoINdV2LhmG','WQpdRmoeWQNdMa','pmoBW6m','qeWmvmo4g8kw','nCkkomk8WQ8','WRy9WQWLcG','WQu0WQTJCG','W5bVW6j6cSkJWRZdNGDkWQPWWQq','DbLrDSoa','WR3dQ8o0WPJdUSoa','WOG8uxi5','hwLSWPVdHSoW','E8k1Da','WPXLWPqUW6lcMaaXWRpdSrGhbGzs','wf/dT8kdnXJdS3u','r1/dUwjRuCoD','CeiPrmoS','W59gWPtdPmo0','WO/dILFdQ8o+','gfzoWRBdKq','omoaW7bpmsupqCoyW4tcOCozB8o9v8kMW63cSXZdI8k3WPRcSICqdW05W500kxLgW6xdQebxxvRdP8kaW48m','5QYZ5z6C6iYZ5y+P5BAW5PsP6jEV55UQ5zE85zgGW67cMw8','ASo1cKC','iSk3ytHF','W7xdISkKW4uE','WP3dKCoeWRddLq','dCoaWRyyva','WPGFW51Woa','W6FcJSk9','W7Hpb3OFpXNcOgm','a3acW4ZcLColWOFcL8oIW61grW','5lUF5OI+6kkz5y6b5REp5PwD6jwe5zEb5zg9W74','z8kSWR8lfIDWbCkGWP4','WORdGKpdKW','WR3dTSoHWP/dH8otWQO','wSkabCojWOe','W7DWW73dLmoTiW','kmoK5AEV6lwCDgJLJOVLMOddM8ok','vrLgxCoW','D3jVoILxWQD4WOj4WPxcKG','W5JdUXO','u0Wux8oe','WQLQW49ZlSkIWOxdSCkLWQGJW4S+xxtdS8kHWOdcHXr8W6Tetd8ammo8z8kba8oRWQ0rWORdTrZcPWtdHCobWR9wuHJcUSoApLP4W6NcJmkatgxdG8koqSkxr8kKW4/dPLn9','5Q2N5z+S6i2P5y6V5BAN5ys75Ro855UK5BM26zcqk8kZW7e','WO3dMNpdSmof','pSkDe8kZEW','WPOTW4L0ba','W7rsWQ9FWPa'].concat((function(){return['W4BJGyROVjtLIyFLHBdMSO/LUBVPKjNJGkm','WOlcI8kQDSkw','WRnxW67dIv0AzXm','WPnVW6/dLLy','W4BdICkkW5SJrW','pCkNuHPom8k/W6GFW5SGW5u','omoaW7bpmsupqConW5dcS8kzk8o0v8kVW6BdSfa','WRlcTCk+qCk6','W4BdQSkSW5S5s8o4W7y','WPZdN1/dISoVlstcOmkJa0P1','BmkaWO0kmq','WOSsW5Dseq','WPO8W75RkSkJ','sepdSMPqDSoAqYjoFui','WQxdUmoGEhpdISkpW4fxkCoQCq','WPu7W7G','BCkkWO4dnW','WQ/dR8o2WRpdOCooWRtdHW','ivldJSos','W4zOWRybDGayWRFcPCkgtf8','WQLJW7/dS3u','5OQK5yIl5y6R5RAK5ywI5RgL','W50wBsddVG','WQOUWRWMfW','cqieW7OS','5Q2V5z2k5OIz6kke5OIj6yAf5y2M5RA65yAs5Rki5BMA6zkeWQVdMfe','WP7cI8k9zSkmWPNcGZfaW5VdJJ3cS8koW7pdVmoxW4SL','n8kPqZboka','uCk9ESkFWP0','nCkNsra','WQFdSCoIWPtdRa','oKXoW6za','WPDLWPW','WRSIWPn0pa','W7qnxH3dMG','WPLRW47dKuLMDCoUW77dPY9bgG','srDt','WO3dJrP9Fmo8cG','W7rSW7hdLSoklItdJGpdUb3cIG','dSk1qqDYo8kMW6G','Ec115AsF6lAW','m8kOsuldGb8','WQpcQ8kOrSkF','vu0nrCoDe8kJW6z+WOG','DCk1D8kZ','W5ZdSmkfW5OEvSoS','W73cHCkOW4fm','WQv/W49I','5O2K5y+96iYm5y+v5AwS6lA9776M6lsT6lYd','WRj2W5rZlSomW4xcQSkLWRqeWPa+','W5nGWQ7dM8oZ','WQCyva','rv7dU8kymb0','W6JdOmkYW6mh','hCoWW5vvaa','WQ4yW7nxla','WPDtW63dGKK','W7xdKmkvW5S6','z+ApJ+wnQ+IVJEAYRowNIEI2VU++QoISLUAHMEADIoE9KEI0TUMfGUISOG','W5VdSrX8FG','6i2L5y6p5PAL5OY55Aw26lwo776hWRpcJmofW6GvWOxcGIJdM8odtCkqWO0GWPJdNmkMW5ZdV8kkBCogWPPZxSo777+M5y6a6icS5PMmj8kTh8ktBYbAc8oTCoEzVEMxVoMHMG','W4WXW4BdVhzJB8oi','WOpcOSkbE8kF','lHNdHfxcICkrW7u','WOPFWQKAW7W','6i225y+i5PEl5O2T5AwS6lA9776MW6RdTmoPASkKjGD2W7JdVCkkWPiyj8oHr0T6pchcO3pcIWxdP8kM772Z5y2A6igU5PMgWPWuW5tdMSo9ExWzW6NdJoEBM+MxGoMIGW','WQaZWO85ka','6k6B5yQM6zU65OwE5z6nW6OmW5LufUI+J+wgH+AHOos/GUAvHUwfOowSMxBLUA7ORRdPGktOVR3OHitMNBRLJi3OJBRLJBtcKCk4rZJdLCoo','W5T9WOi','WQieFwu5arZcKW','WP56W5q','dv17WRZdPSoOW4jsW4qWpum','FWSzWQyJpSoc','WPLLWP8Z','WQhdMCo3WRZdVq','gSoWW5TQdeX1la','W67cPe/dT8oR','6iYd5y2cjG','WPLhmW','l0/cK0ur','wh/dN0jI','irJdP1FcRCkqW7RdLSkIW7BdIwu','Dg5KeavqWQj5','rsxdJW','mSkwiSkJzxu','WP46xKG0','WOHXW5H1fG','WO9VWQOJW78','FqldSCo0WQ4','5BEx5OMO5yQR5y+45RsD5ywK5Rcf5BQP6zgf77YW','WRtdN1FdJSoE','auldTgb9','bc0biCowWPjmWO5/fxxdJeScfCkbWO4FW7TZerLYp8otWQpdLSoCWRzlj8ovW4tcHmkxAXHvBmoKcumHybpdUSkCW6GJW7RdJq/dQhhdTdCzba','iX4G','WPVdRmoJWOpdMSogWRxdHG','lmkKqeVdPWnD','W6hdNrD6ra','W5v9WOhdSq','WQKzWR1EuW','trCkWQaFomozsmkafmkKeCoR','WQzXW5rNdCo5W43cU8kxWReWWOa','WPr9W5tdRKi','rbPKvSoN','c8ocWRCPqatcP8oerSkwiYy','jmkAm8kVE2ydWQBdIG','W5TqWOXxWQC','5zwG5zoK5Pwu6jE65yQd6kcF56Qv55Il','mCkKre7dUHzciq','fmofWR8','WRPBW7K','g2nRWPi','dezMWQ/dMq','5lId5lQf5P+V5yIv5zIL6l+25zMa56U15PAU5OYQ','gSkIqw7dUW','WOa1W6LadLurWRFcNmkIr1q','pvldMSoJd0q','WQRdUCodELFdI8ka','AHarWQuZiSorqmkId8kPgW','44oJ5lUX5lQA6lsw5y6Y','tbzxqSoGC8kitq','WRm3WReLkaldRW','W4JdK8kwW64L','p8kpmSktrvelWRNcNf0','WQ1XW5W','5lQk5lI56lwe5y+c','DJb1hW','W63cImk9W45K','rupdV8kYoG','cmkWCdHR','iwVdICojfq','W6xcGmk3W6G','omkUrqD9lG','WQ8tsu07','hvPWWQK','F2fTmG','W68ZrqNdNG','cZddOhlcLa','44cM5lQA5lQi6lEo5y6o','r3ddS8kgla','W71yW6/dTSoG','WRTlhgeo','bxZcRNONdXlcNCoq','WOVdGw1SW7K','sCoRotO','5O2w5y6+6iYX5y+M5Aw06lsv772K6lst6lY0','WOr6W7VdLMq','wvtdVSkngG0','paq3W6SnWOhdHxtdKmoTW5irDN3cRq','5BUM6zo26kkP6lY75RMw776u5zow5P2C5ywz6zAB6kY5','FKD2WQ1rW4ldMuVdSSo3W58j','qCoRma','xYW8WOKX','WOxcJmkTEmkaWOVcJsy','xrevWR07','WP53W6NdRga','WPiXW7PPrSk2WRpdN1Lk','dg3cU3WT','WQeUW7vwiq','WQrWW59qnCo3W5RcRq','pSkaiSkQygupWRm','W6vJWPBdM8oZ','W5BdMmoZlSot542f5AgJ5y6B6yEM6yE057+f5AES5lUqW5ZcVSkYWQtcGW','omkzl8kfEM4bWQNdLG','WOK1W61QdG','WR42WRi','wLpdUSkpdre','WP8LWPjViY7cU8oi','W7dcOvVdOSoT','pSkvkmk1WPldJq','gCoNW4jlja','WPddIvZdK8onntu','WQvjW6tdK2m','ffLNWQVdHa','W7RdQSkhW4ydq8oZW6O','DmkgWO8+aG','rdNdJW','q0ldUG','q8oLoJO','WOP1b1ddLW','sSknWOyUla','5BUa6zcu6koQ6lYb5RUX77Yn5zgb5P+j5yEa6zwd6k6c','W4KJrW','DSkQy8kiWOmZxJRdNG','WQDTW6ldR0u','W4mTwb7dULCXW5SVlflcS8osWPJdLq4','WRj5W75Wpa','mgemW4NcLa','p8k6emk3WRK','xmouhc7cJq','WOCQWRaLcqRdPSoI','W6hMJjBLJ43OR5JMS6RLPRtOTB3VVi7ORkFMOA/MNBtNVPxOTBdPHRZOR68','qLldRMP5','WP9PW4tdM0n3','W6ShWR3cKgCwFqm9da','W5fTWP5IWPu','t0SgumoSomkj','puxcKxGN','W4CUxH/dP2G','W7PoWOn1WRu','idurW6W6','smoQmWZcJSoYWOWk','tYBdH8o+WRC','WQeXWRONcqRdPSoI','WQFcTSk3CSkz','fWTsg8kN','xuhdSw5N','WR3dSmoRWPq','W4jSWR4fDGu9WPhcMCk8C0u','wCoRiZ7cISotWOKu','WPDlWR4/W6i','ovDoW7LdESoazCk3nSkIbG','vfNcSgr9','jbKlW58y','gM3cSNq9aa','WPe8W7jtlxmjWO7cKmk1t2hcJtldQCkmW6RcRSk/','WPfwW6xdJf8','WONcISkQAG','WRldNfXB','WPL/cKFcTcfPWP9fFH3dQSkCW6VcNv7dPCorncnXWOyr','gmkwj8kBWRm','W4FcLKJdTSoOcSkhWPDQ','WPP5jhCL','qeqlwCoahSkcW6P+','WPzepvaMymoHWRiJW6HwWRzv','44or5O2J56su44c+W4VdQJDPWRNdIUw1O+wNTEAxLW','WOhcOJ5oAComhfK','W5blWOvxWO8','WRbEWPKoW5u','W4JcLSkJW4LV','WOPMhx3dOq','WPa1W6DcbL8mWOxcSSkK','oCkHseRdHG','W7NdKcXguW','WONdHNDhW6m','qSkrcCobWP8','yv4HW64mWPddHvFdU8oqWRuTtZxdUqKMwcRdOq','b8odW6HBfG','FIpdJmo3WOO','W4tdPHrczCobfxu','W6ZdNW9RDW','W49LW6WYzx7dQ8oPW5JdMSkaW63cOa','W4tcJ0ldV8omf8oqW5i','tctdNG','WPz5WPW','5lQN5zw75zg8WQW','WQizv281','W6xcSmkTW4HX','pmkPsXfpdSkKW7KYW54DW5tcIa','WPjyWP4+','W40ZW4T4W4xcVHi9WRtdKW','B+IVTEMgOoAuKEEAREw/TUInKEwmS8kRW6PwvSoUC8k7WRGCW73dRSo7uCkAmSoobtqAkSkGr2VdLXS7p3GobbTLEt8vAdmrWPyrjCkHWP8x','WPqGWRjJnG','W6DWW63dJSoRnsBdJINdTrZcVmo9W69xAmkWWP/dQG','E8oTotpcOG','W5lcN07dQSoSaSknWPDkWOlcUmkg'].concat((function(){return['gghcV3GhcrBcNG','WQZdUCoqy1xdKa','WQv+nfFdLmkg','gcSmkSopW5SmW49UjL7cQwCe','WOLVWOSMW7dcSaa','fSodWRSYxGtcRCoe','fhrHWPNdGSoSW4D1','pmoJWReJqq','W67dUcv6DG','gmkhtsr+','WPNcIXFdPSkph8oBWO4SWPFdTCkFW60BW6hcTxtcJxuDsK8','kWxdR3/cNmkk','WR3dUSoOWPxdMSoiWQZdISkUW7K','WQbgW7zNba','i8oCW6TpmuTpgSoBW43cJSocla','FwvUmb5x','CtjxzmoD','WQDli1Sb','jd09W5O1','WO3cHmk4FmkCWOpcLczLW5ddMbO','WRVdJmovuxq','W53dVmkwW5CIrSo7','WOOrWRXhyG','W4ZdSCkdW4yotCo6W6RcNZa','n8kjkSk3WOy','eMnVWPhdU8o8WRe8wCob','WPOvWPfvbG','mmkblSkIzKOpWRNdPai9rCoHW584','n8k2ESkHWPn6FZ/cKSkNuCohqWW','W7aQWPuY','yGSDWQm+k8oDvW','vqPDqmoHw8kcwq','6i285y6H5Pwd5O2K5Aw86lwn7722W54bgCo4nbDGlmk8W7FcJxvtW58ZWQBdGmkzxhFcSrmGW4FcI8kM77Y+5yYU6igX5PUOzSkJWQxcJCkds04XkCoJ55MJ6zEE6AkD','WQ7dUCoO','smogjbtcIW','WObgb0aQz8ouWQu4W7LAWPbvB8o4WPhdQmkAW6uBWP8','n8kPqW','dmkbo8k4WQ4','eLPZ','WOFcISkP','W7fNW7etpLRdKCoEd8ktWR3cQmkOW71bWPS+tw/dISoTWOtdMW','W5FcUwpdN8on','5Psv5BQ/6zkU5y+A5y6E5RAC5yEe5Rc/wW','W7vKW7FdI8kLzIhdMsBdUXJcM8oWWQWhECkm','W5RdVr5hx8oSf3C','5y2G5RAV5yAz5Roq5zA75zoI5AsC6lAgWRC','W5FcS1ddGSor','W7lcVSkHjG','W7xcTMddTSoR','D8kSWRejhI1Tn8koWPHHW64','oSkdeCk2WRG','W5lcMfpdRG','uwriBmky54Yh5AoG5y256yEr6ysO572Y5AwG5lITeuldMmkDqq','xSoSoc/cR8o5WRaqW6BcSW','WOywWOaomq','5O+j5y666i+c5y6h5AAu6lAn772V6lws6l+z','iHaZW7Gk','gMFcUW','pmkLrLFdTqm','agWjW6BcUComWOlcLG','WQXqmMal','W7X/W7pdNG','BSk+uSkTWQ8','5O6H5yYN6i2P5y6V5AwK6lwT77Yy6lAt6lYM','ESk7z8kPWP4','W5nFWOLDWO1x','W43cKK/dVCoicW','WQn/W4HM','vuWfw8oha8kD','WP8Yvu4F','W6DkW6FdQ8oF','a8knmCkGCW','WOqJWRzegG','iqBdP1xcNa','WPFdVmoTWR3dGG','WRLPW4LscG','g37cMCoaWQVcQ8kIwN8','WQldSmoH','WQHqW77dL1eiAqqeiZNdM2VdNmkBWP/dH8kGW6O','c8ocWRCPyY7cPCoyqSkqkYFcPwn6bG','WO7cPCk6oWa','WPeqW6HxlG','WPLRW47dKuLM','W7XnWPbkWOO','vHbBxSoCCW','WQiAW496pa','WP43WO1Rva','WPJcJCkHy8kDWR7cJZDiW5xdPrVcTG','pvJdK8obcv4','pCkwl8kara','nCkSomkGFW','WPVdRSo/teC','sXLzsW','i8obW7rplw1ulmoFW5lcTmoNimoPvSo8','W55/WRL8WP8','WO4nsuCl','irGKW7amWPldNfS','butdM8o0ha','WQeWWRi5fb/dUq','nXJdOvtcMSk0W7tdGW','kmkUsWvpeCkUW7qeW50HW4xcLKyhW5W','W6fXW6ZdJW','nfPnWPxdMW','W6FcHmk0W6Pbnq','WPpdV1xdKW','WRXla1eG','WP8FWQn5Aa','WP7cI8kDzSkmWPNcGZfaW5VdJIFcTCkvW6BdVCoVW58K','Ea0TWRWci8oEvq','W5r0W7RdOSoB','ESkRhConWRa','W7zQW5ZdLCoo','W4zVWQHcWQS','pSklomkGWOJdLSo2W5ZdNG','oKbpWRldVCoiWQWhECoHWRvoW6BcI8kkW6VcIuldKe1Ij8k9WRVcMCk4m1afeMu2W60nWQuXW64AW7JcQCkUAxJdUbldM8ojWRZcLmk2WP7cGmkiWQWeWQtcNv1FWPjcedtdQa','W6v/W7FdJW','pSo6uSk6WOy2vWNcLmoLvCo9f3TZCxGVt8kUW45iwmohWOr8wCoWW7HMW5nYasZdNCkMWQ3cTHOvWOhdHmkfxmkDWPLuyCkVFWtcTLpcS8oZcq','gWFdNMvRx8oDEG','WQ3dO8oSFN7dG8kdW5y','pCovW7bCdq','m8kIqa','WPBMJOlLJiNOR4/MSR/LPjlOTiJVVQ/ORyRMOktMN4hNVB3OTP7PH4/ORQG','WOjBW5XeW41FhSoFWORcMbvqq35i','x8kkvmkEWQm','vHu/WOmP','W5HgWODD','hmkCkCkSya','W5X9WQRdHCoV','cqCxW5eh','W4mTwb7dUKG7W5yzl27cOSom','eMnSWORdL8oQWOKawmoz','g1RcJf0L','WRtdP2DoW5S','hNTSWR/dNCo3WPy8tW','zbVdPCodWPi','WPWSW7X8g8kJ','WPyLW6vvnuq','F3eZFSo4','5AsF6lsu5Q685Pw35yIJ6l6G6kYf5A6R5ygD77YT6kE/5y+26zUc5Q+I5B+754YB5P6Z5yUB776J6k6c5BME5y+G5Bw/6lAU6l6v','ru0dr8oxgmklW6PmWOG','WQGyxxWOgG7cV0ne','qctdI8o9WRdcPCkTxq','bM/dLSoxpa','WQ5oW6hdI0C','WOJdL8ofWPZdLW','WRe2WRS5iGJdV8oOW44','oCohW4PqnNzgf8kaWOe','vISjWQCh','jLVcI3i/','WRWYCLOJ','w8khnCoTWQFcICkcW4bF','eSofWRe3','cMahW4tcTCox','W4FdMs9osa','WQbBmuCgDCoAWRi','WRJdLSoQWROmBCkmeSovseVcOa','W7jeaZH/uuZcSNbEWR8HbG','WQP5mG','WQ5wW6ldKKaVzqimlrldVw4','WOqtW5TPWPnjr8oxW64','s8oLpJpcSSo0WPeCW6y','WQ3dNeK','W4tdTq9FDa','WPC9W7XYjCk2WRldKW','l8kSvvBdKq','eLb6WQVdGSoH','W7a2FJddKa','W7hdJrboxW','w2Hbfrm','44gb5lQr5lQH6lAa5y6k5lI244cf5y+w5ywo5lQB5lII5BQz6zg85zEW5zkm5AE46lER','eCo6WRa2FGddU8kbvSkVdgpcV31NbgFcNNhdHIX/','WOv1W7RdGfy','FvVdG8kJfq','WRtdQ8oMyq','W4lcLLxdUCou','et3dO1JcHa','WPNdHvhdLCoTmq','WRC5W5TBlq','xvNdSNDGvCoEsdzoA0pcG8oxjmoz','h8ofWRC9yZhcR8ovDmktfZBcUW','WQHJWPWKW6S','WRrqW6RdR0i','yu8iw8oa','f0zyWQpdKCoGW4S','WQHQW6ZdPN8','W5JdSrnlzCoL','nSkajCk0EMGo','mCoeW7rtjW','WQ5wW6ldKNOFrH8Enq','cCkUcSkJWOG','WR3dQSoTWQVdLW','WPNcGCkOECkQ','lWBdMxVcGW','wsVdMSoIWQa','W4WqzrBdOW','WPW5WRvU','W4GTua','W5DxWPPuWPratmoxW5tcI0Odcs8kDmktiWJdQ8kGmLOdwSoRobvtWRhcJSo9wG','BWOFWROZjCouv8kGfa','r3r1hcm','W6rrWP9FWOS','lb0UW74mWOFdP1VdPSonW7mPuW','5lIn5zwm5zc6qa','jCkom8kbWQS','nCo2W6Po','WQVdVSo7zupcMmobWPX2i8oVEMTHvmoiseujWOpdM2nuW5/cVCoprSoxewLGW7qQwfuUWQtdNmoYWQa5W71e','rJNdT8oNWQdcSW','W4fDgsbN5B2O5AAX44o65lQD5lI06lE+5y6c','qdy7WQWX','f8orW45xiq','WRr3o0hdUSkF','WQNdRSoUzua','W7fXW7RdNG','WPn+WO86W6ldQuPNWPpdR0qjerirW6tdQ13cGIawf8oyW5/dJ8kEW5jKWQhcLCkeehlcGWHoWPpdPmk4WORcNNJdOSoHet7cIf8','WP08W6Tv','5lMpcoobVEI9UEwkV+whKoAWJUwwO+wrOoocKW','pCosWQGDra','dCoeWQSSCHBcO8otFmkDpbdcVKj/geFcJJW','mCkwjG','WPnmWRWYW5O','W7ZJGyBOVitLIANLHktMSQ/LUyRPKyVJGOG','WPvjW69Xoa','iSkaeSkZD3ijWRldMG8QAmo8WPf9WPv3vmox','AdqkWR4L','W4yJrb8','q0Su','WONdHv/dL8oNidZcHCkphKPJW6dcPa','WP8BWRSTnq','yaCqWQ8eiG','WRfrW6RdP0ej','W5riWO5b','WPxdICoEqfm','k8kNvGzz','W6JcJSk+W6G','a21SWPJdNCo1','WPXBgLOSCq','WQHqW57dL1eiAqqeiZNdGw3dH8koWP7dV8k0W6S','tvNdVhvqCCoFvcbv','WP9LW6ldMem','WP9rgNpdJq','WQS1WQnkCdpcG8kxu8ocW47dOmo4','WOTBn1ddGG','pmkLrLFdTXHliqGw','Eg5KmHi','x0xdMmkhhHddSa','WQ5IivxdPSoixIicW5DNrmkgWQPMW5xcKSoEW40','dv17WRZdHCocW4boW4a2nujoWOzEmq','W7NcHmkUW65AoCkc','WQuEugedcrFcJW','6lEw6l6/6lss5y+z776p','WQnbWOKnW7C','W5RcL8k8W490','suJdNgrA','CCkQWO0mnZT3eSkiWOHGW5tcSCkyWRCwWPyUrW'];}()));}()));}());Iii11l=function(){return lIlIiI;};return Iii11l();};async function IIiI1I(iilIl1){const i1IIii=lili11,l1II1={'dtBnG':function(III1i1,IlI1){return III1i1===IlI1;},'oQpBm':function(I1IlIl,l1I1i1){return I1IlIl===l1I1i1;},'uTaDL':'yEYxK','TJcJH':function(I1IlIi,l1ll1i){return I1IlIi(l1ll1i);},'ufFNl':i1IIii(0x1ab,'9s[)'),'sgEsa':i1IIii(0x2ea,'17&E')};return new Promise(async IiIil1=>{const il111l=i1IIii,i111l={'xwrQW':function(i111i,lIlli1){const i1IIil=iii1II;return l1II1[i1IIil(0x382,'28uX')](i111i,lIlli1);},'TBGev':il111l(0x31c,'8]98'),'tvCgH':il111l(0x464,'x6jL'),'engdF':function(llIii1,I1IlII){const iIl1Il=il111l;return l1II1[iIl1Il(0x2f1,'tqkV')](llIii1,I1IlII);},'JoYYm':il111l(0x1d5,'J(I]'),'Jwfnn':l1II1[il111l(0x3cb,'Dz7v')],'uTyPV':function(l1III,l1I1iI){const il111i=il111l;return l1II1[il111i(0x323,'$AV5')](l1III,l1I1iI);}};console[il111l(0x41f,'IiN7')](l1II1['ufFNl']);let lIiIlI=il111l(0x442,'@&7$')+iilIl1[il111l(0x3aa,')YS(')](',')+'\x22}';sign=await iliiiI(l1II1[il111l(0x2cd,'IL[O')],JSON[il111l(0x20a,'$AV5')](lIiIlI));ll1Iii?$[il111l(0x273,'$ng9')]=sign?.['data']?.[il111l(0x395,'%1z$')]||'':$['signStr']=sign?.[il111l(0x2ec,'3vhF')]||'';!$[il111l(0x1d8,'17&E')]&&console[il111l(0x3ed,'Z!Wp')](il111l(0x2a4,'17&E'));const iilIlI={'url':il111l(0x20e,'IL[O'),'body':''+$[il111l(0x25c,'TKjG')],'headers':{'Cookie':cookie,'User-Agent':$['UA']},'timeout':0xa*0x3e8};$[il111l(0x489,'IiN7')](iilIlI,(III1l1,Il111,lIiIli)=>{const iI1iII=il111l;if(i111l[iI1iII(0x3de,'Z!Wp')](iI1iII(0x2ae,'Dz7v'),i111l['TBGev']))iiilil=iil1li['parse'](lillIl),i111l[iI1iII(0x35e,'IL[O')](iIiIl[iI1iII(0x3e7,'28uX')],'0')?(Ill1l[iI1iII(0x2b8,'KDO(')]('成功取消关注'+llI1Il[iI1iII(0x355,'KcB3')]+iI1iII(0x308,'gY3^')),ii1iii[iI1iII(0x2f2,'x6jL')]=0x0):i11iil[iI1iII(0x271,'z*P^')]('取消关注商品失败\x0a',Ill1i);else try{'JitZE'!==i111l[iI1iII(0x44a,'$Byj')]?III1l1?(console['log'](JSON[iI1iII(0x2a1,'Dv3s')](III1l1)),console['log']($['name']+iI1iII(0x24e,'Rr0^'))):(lIiIli=JSON['parse'](lIiIli),i111l['engdF'](lIiIli[iI1iII(0x3fc,'9Bbq')],'0')?(console[iI1iII(0x262,'tqkV')](iI1iII(0x229,'@YW^')+iilIl1[iI1iII(0x478,'IL[O')]+'件商品\x0a'),$['failTimes']=0x0):i111l[iI1iII(0x379,'p#8F')]===i111l['Jwfnn']?iil1i1[iI1iII(0x48f,'cgPg')](iI1iII(0x244,'IL[O')):console[iI1iII(0x247,'k6)y')]('取消关注商品失败\x0a',lIiIli)):i1i1II[iI1iII(0x1c3,'gY3^')]('【京东账号'+liiIIl[iI1iII(0x44d,'Rr0^')]+'】'+iil1iI[iI1iII(0x33f,'@YW^')]+'\x0a【还剩关注店铺】'+IlIllI[iI1iII(0x245,'IL[O')]+'个\x0a【还剩关注商品】'+il1i1I[iI1iII(0x403,'^493')]+'个');}catch(lIlliI){$[iI1iII(0x419,'W]GM')](lIlliI,Il111);}finally{i111l[iI1iII(0x359,'28uX')](IiIil1,lIiIli);}});});}function lIi11l(){const l111Ii=lili11,iIIlI1={'mRPNl':function(IiIiil,IlIi){return IiIiil(IlIi);},'TyfRa':function(IlIl,IiII1){return IlIl<IiII1;},'NIXWy':'3|2|6|0|7|5|1|8|4','ydAgY':function(l1IIi,l1IIl){return l1IIi+l1IIl;},'mMwKE':function(l1I1il,III1ii){return l1I1il|III1ii;},'VgKqx':function(l1I1ii,III1il){return l1I1ii<<III1il;},'DVgqR':function(I1IlI1,i1111){return I1IlI1%i1111;},'dcOQe':function(iIIlII,IlIi1l){return iIIlII>IlIi1l;},'unmKv':function(IiIiiI,IlIi1i){return IiIiiI|IlIi1i;},'uggLR':function(lIllii,l1il1){return lIllii>>l1il1;},'VOiJS':function(IIiI,l1iil1){return IIiI|l1iil1;},'MtOtk':l111Ii(0x454,'KDO('),'FBDLn':l111Ii(0x1e2,'(yVU'),'bCQgE':function(iiiIiI,Ill1i1){return iiiIiI*Ill1i1;},'imGAJ':function(illl1I,lillI){return illl1I!==lillI;},'qzINX':'ErOvF','zegod':function(Il11i,illl11){return Il11i===illl11;},'cyVmo':'vVipo','pBQGW':function(iiI1,Il11l){return iiI1!==Il11l;},'YDvtW':l111Ii(0x1c4,'p#8F'),'ddyrM':l111Ii(0x30a,'9Bbq'),'tzRDz':l111Ii(0x41e,'28uX'),'CaDTR':l111Ii(0x250,'KDO('),'JhABy':function(l1iiil,l1ilI,IIi1,illl1i){return l1iiil(l1ilI,IIi1,illl1i);},'jRFWy':l111Ii(0x316,'GSM%'),'TAAlW':function(l1iiii,iiiIi1){return l1iiii!==iiiIi1;},'aXMdY':'HAiIa','figCQ':l111Ii(0x380,'28uX'),'towTP':function(illl1l,Il11I){return illl1l(Il11I);},'GyPWJ':function(li1lll,lill1){return li1lll===lill1;},'pVtoh':l111Ii(0x364,'hq!l'),'gOozo':function(IiIIl,IiIIi){return IiIIl===IiIIi;},'hGKNZ':'RgHAX','ExpDT':l111Ii(0x2a8,'%1z$'),'lucxh':function(li1lli,iiiIl1){return li1lli+iiiIl1;},'tFCBs':l111Ii(0x2db,'z*P^'),'rFHKz':'ZUCTf','grSgb':function(I1i1I,IIl1){return I1i1I(IIl1);},'UIjVU':function(l1ili,i1Ii11){return l1ili*i1Ii11;},'RJOUy':l111Ii(0x257,'GSM%'),'miCiG':l111Ii(0x356,'IL[O'),'UJOFk':l111Ii(0x3d1,'N(eh'),'UcahB':l111Ii(0x20f,'Zlrb'),'hGOhq':l111Ii(0x21a,'W]GM'),'ZOFBM':function(l1iill,l1ill){return l1iill*l1ill;}};return new Promise(lIi1I1=>{const lili1I=l111Ii,l1iili={'tZSrM':function(illIIi,iiIi){const lI1i11=iii1II;return iIIlI1[lI1i11(0x274,'@YW^')](illIIi,iiIi);},'eCqpP':iIIlI1[lili1I(0x429,'tqkV')],'EofKO':iIIlI1[lili1I(0x473,'*gs#')]};if(iIIlI1[lili1I(0x45a,'$Byj')]===lili1I(0x293,'A$GR')){console['log'](iIIlI1[lili1I(0x2ce,'cgPg')]);const iiIl={'url':lili1I(0x49f,'1Z9J')+args_xh[lili1I(0x27b,')YS(')]+lili1I(0x486,'Ei1x'),'headers':{'Cookie':cookie,'User-Agent':$['UA'],'Referer':iIIlI1[lili1I(0x252,'3vhF')]},'timeout':iIIlI1['ZOFBM'](0xa,0x3e8)};$[lili1I(0x281,'Dz7v')](iiIl,(Iil1I,illIIl,iiiIlI)=>{const I1III=lili1I,I1i11={'QvfBA':function(Ill1ii,IllII){const i1iiII=iii1II;return iIIlI1[i1iiII(0x396,'Dv3s')](Ill1ii,IllII);},'lAEus':function(Ill1il,IIlI){const l111Il=iii1II;return iIIlI1[l111Il(0x374,'gY3^')](Ill1il,IIlI);},'WidfO':iIIlI1[I1III(0x2c7,'Zlrb')],'bysLg':function(I1i1l,llIiIi){return I1i1l>>llIiIi;},'ingMq':function(IIil,IIii){return IIil&IIii;},'QYsUs':function(i1Ii1I,llIiIl){return i1Ii1I+llIiIl;},'LiiMH':function(I1i1i,lIi1II){const l1II1I=I1III;return iIIlI1[l1II1I(0x351,'$Byj')](I1i1i,lIi1II);},'vdrLy':function(iiiIii,IllI1){return iIIlI1['ydAgY'](iiiIii,IllI1);},'MDQjB':function(iiiIil,lilll){const iiliI1=I1III;return iIIlI1[iiliI1(0x476,'@&7$')](iiiIil,lilll);},'IocvK':function(l1iilI,lilli){return l1iilI<<lilli;},'xyzsx':function(iiII,Iil11){return iiII&Iil11;},'yTZZw':function(Ill1iI,i1Ii1l){const iIi11I=I1III;return iIIlI1[iIi11I(0x1f4,'x6jL')](Ill1iI,i1Ii1l);},'TOUYv':function(IIll,i1Ii1i){return IIll>i1Ii1i;},'qTfjY':function(iiiIll,iilliI){return iIIlI1['DVgqR'](iiiIll,iilliI);},'FvPJe':function(iII1i,ilI1ii){return iII1i<ilI1ii;},'jpkgz':function(iII1l,ilI1il){const iiii11=I1III;return iIIlI1[iiii11(0x452,'tqkV')](iII1l,ilI1il);},'gJtZh':function(i11Il,i11Ii){return iIIlI1['unmKv'](i11Il,i11Ii);},'ZCJmJ':function(iII1I,iilli1){const iIl1II=I1III;return iIIlI1[iIl1II(0x1f6,'@&7$')](iII1I,iilli1);},'LHzHx':function(ilI1l1,Iil1l){return iIIlI1['VOiJS'](ilI1l1,Iil1l);},'witma':function(Iil1i,i1i1i1){return Iil1i&i1i1i1;},'hueiO':iIIlI1[I1III(0x235,'pKFk')],'qPKqk':iIIlI1['FBDLn'],'QaeXU':function(iiiIli,IllIl){const il1lIi=I1III;return iIIlI1[il1lIi(0x2cf,'Z!Wp')](iiiIli,IllIl);}};if(iIIlI1[I1III(0x4a1,'tqkV')](iIIlI1['qzINX'],iIIlI1['qzINX'])){let IIli='';for(let iII11=0x0;iII11<i1iIl1;iII11++){IIli+=i1iIlI[li111[I1III(0x2f6,'IWgc')](l1iili['tZSrM'](liI1lI['random'](),lIIiI1[I1III(0x37a,'9Bbq')]))];}return IIli;}else try{if(Iil1I){if(iIIlI1[I1III(0x2b0,'Dv3s')](iIIlI1[I1III(0x212,'hq!l')],'vVipo'))console[I1III(0x234,'(yVU')](JSON['stringify'](Iil1I)),console[I1III(0x45d,'Dz7v')]($[I1III(0x29a,'IiN7')]+'\x20接口请求失败，请检查网路重试');else{IIIIlI=l1i11l||liiil1;var l1iI11='',l1I11,i11I1,IlIiI,l1iI1I,ilI1i1,l1I1I,l1lII1,iilllI=0x0;lllII=I1i11[I1III(0x40e,'9Bbq')](l11iII,l1i11i);while(I1i11[I1III(0x2e5,'(yVU')](iilllI,l11iI1[I1III(0x45c,'KDO(')])){const i1i1iI=I1i11[I1III(0x301,'q!eF')]['split']('|');let iillil=0x0;while(!![]){switch(i1i1iI[iillil++]){case'0':l1iI1I=I1i11['bysLg'](l1I11,0x2);continue;case'1':l1lII1=I1i11[I1III(0x1ea,'^493')](IlIiI,0x3f);continue;case'2':i11I1=IIiiIl[I1III(0x400,'J(I]')](iilllI++);continue;case'3':l1I11=liiii1[I1III(0x204,'Zlrb')](iilllI++);continue;case'4':l1iI11=I1i11['QYsUs'](I1i11[I1III(0x2da,'IWgc')](I1i11[I1III(0x242,'9Bbq')](l1iI11,l11iIi[I1III(0x297,'8]98')](l1iI1I)),ll11li[I1III(0x220,'hq!l')](ilI1i1)),iliIlI[I1III(0x42f,'A$GR')](l1I1I))+lI111I[I1III(0x34d,'$ng9')](l1lII1);continue;case'5':l1I1I=I1i11[I1III(0x2fc,'@YW^')](I1i11[I1III(0x26a,'IL[O')](I1i11[I1III(0x1b2,'$AV5')](i11I1,0xf),0x2),IlIiI>>0x6);continue;case'6':IlIiI=l1ilIl[I1III(0x2fa,'17&E')](iilllI++);continue;case'7':ilI1i1=I1i11['MDQjB'](I1i11[I1III(0x22a,'*gs#')](l1I11&0x3,0x4),i11I1>>0x4);continue;case'8':if(IIiiIi(i11I1))l1I1I=l1lII1=0x40;else l1ilIi(IlIiI)&&(l1lII1=0x40);continue;}break;}}while(I1i11[I1III(0x349,'KDO(')](I1i11[I1III(0x1c9,'k6)y')](l1iI11[I1III(0x2b9,'A$GR')],0x4),0x1))l1iI11+='=';return l1iI11;}}else{if(iIIlI1['pBQGW'](iiiIlI[I1III(0x1f3,'J(I]')](iIIlI1[I1III(0x2a5,'Dz7v')]),-0x1)){if(iIIlI1[I1III(0x2c2,'Zlrb')](iIIlI1[I1III(0x1e9,'KDO(')],iIIlI1['tzRDz'])){console[I1III(0x267,'q!eF')](iIIlI1[I1III(0x43a,'hq!l')]);return;}else{var ilI1iI=liIIi[I1III(0x39e,'x6jL')](IilllI);if(I1i11[I1III(0x393,'z*P^')](ilI1iI,0x80))iiIiII+=Iili['fromCharCode'](ilI1iI);else I1i11[I1III(0x32b,'Z!Wp')](ilI1iI,0x7f)&&ilI1iI<0x800?(iIi11+=Iil1[I1III(0x222,'[u1o')](I1i11[I1III(0x24a,'W]GM')](ilI1iI>>0x6,0xc0)),ll11lI+=llliI1[I1III(0x21d,'@&7$')](I1i11[I1III(0x28d,'r6Ix')](ilI1iI&0x3f,0x80))):(liIII+=llii11[I1III(0x289,'TKjG')](I1i11[I1III(0x421,'IWgc')](ilI1iI,0xc)|0xe0),Iillli+=ll11l1[I1III(0x20b,'IiN7')](I1i11[I1III(0x2d6,'IWgc')](I1i11[I1III(0x3c8,'Dz7v')](I1i11['ZCJmJ'](ilI1iI,0x6),0x3f),0x80)),ll111+=llliII[I1III(0x1ad,']#2U')](I1i11[I1III(0x481,'9s[)')](I1i11[I1III(0x491,'p#8F')](ilI1iI,0x3f),0x80)));}}iiiIlI=JSON['parse'](iIIlI1[I1III(0x3bb,'IiN7')](lIi11i,iiiIlI,iIIlI1['jRFWy'],I1III(0x1eb,'hq!l')));if(iiiIlI[I1III(0x37b,'@&7$')]==='0'){if(iIIlI1[I1III(0x343,'KcB3')](iIIlI1[I1III(0x320,'IL[O')],iIIlI1[I1III(0x292,'9Bbq')])){$[I1III(0x36a,'3vhF')]=iIIlI1[I1III(0x455,'r6Ix')](parseInt,iiiIlI[I1III(0x2e4,'ES97')]),console[I1III(0x49c,'[u1o')]('当前已关注店铺：'+$['shopsTotalNum']+'个');if(iiiIlI[I1III(0x418,'p#8F')][I1III(0x36b,'gY3^')]>0x0){$[I1III(0x1b0,'hq!l')]=0x0;for(let l1I1i of iiiIlI['data']){iIIlI1['GyPWJ'](iIIlI1[I1III(0x295,'gY3^')],'OAtzd')?iIIIII[I1III(0x334,'[u1o')](I1III(0x3bc,'gY3^'),I1i11[I1III(0x484,'@&7$')],I1III(0x1f8,'W]GM'),{'open-url':I1i11[I1III(0x2d0,'ES97')]}):args_xh[I1III(0x344,'Zlrb')]['some'](i11II=>l1I1i[I1III(0x1b6,'9Bbq')][I1III(0x3a0,'q!eF')](i11II))?iIIlI1['gOozo'](iIIlI1['hGKNZ'],iIIlI1['hGKNZ'])?(args_xh['printLog']?console[I1III(0x247,'k6)y')](iIIlI1[I1III(0x3eb,')YS(')]):'',args_xh[I1III(0x48a,'KDO(')]?console['log'](l1I1i[I1III(0x2de,'KDO(')]+'\x0a'):'',$[I1III(0x377,'8]98')]+=0x1):IllI1I[I1III(0x21c,'r6Ix')]?i11I11[I1III(0x2c4,'J(I]')](l1llIl[I1III(0x390,'IWgc')],'','【京东账号'+ii1I1l[I1III(0x406,'IiN7')]+'】'+ii1I1i[I1III(0x441,'Z!Wp')]+I1III(0x3ef,'pKFk')+llI[I1III(0x417,'[u1o')]+I1III(0x43b,'A$GR')+llliI['goodsTotalNum']+'个'):iI1li1[I1III(0x413,'x12J')]('【京东账号'+lllii1[I1III(0x1d4,'z*P^')]+'】'+liIli[I1III(0x40b,'k6)y')]+'\x0a【还剩关注店铺】'+liIll['shopsTotalNum']+I1III(0x43b,'A$GR')+IilIi1[I1III(0x3c6,')YS(')]+'个'):($['shopIdList']+=iIIlI1['lucxh'](l1I1i[I1III(0x248,'A$GR')],','),$[I1III(0x22e,'3vhF')]++);}}else{if(iIIlI1['imGAJ'](iIIlI1['tFCBs'],'dVExD'))$['endShops']=!![],console[I1III(0x41f,'IiN7')](I1III(0x33d,'tqkV'));else return i1lllI[llIIi1[I1III(0x35c,'Rr0^')](I1i11[I1III(0x1ec,'$AV5')](iI1IlI['random'](),l1i1Il['length']))];}}else try{return IilII[I1III(0x3b7,'$ng9')](ili1l);}catch(Il1ill){return I1iIi[I1III(0x42d,'GSM%')](Il1ill),iiiI1I[I1III(0x2c3,'q!eF')](lilI11[I1III(0x3e9,'17&E')],'',l1iili[I1III(0x276,'^493')]),[];}}else console[I1III(0x360,'N(eh')]('获取已关注店铺失败：'+JSON['stringify'](iiiIlI));}}catch(Il1ili){iIIlI1[I1III(0x249,'r6Ix')](iIIlI1[I1III(0x21f,'hq!l')],iIIlI1['rFHKz'])?$[I1III(0x3f8,'Dz7v')](Il1ili,illIIl):lllil[I1III(0x375,'KDO(')]=iI11Il?.['body']||'';}finally{iIIlI1['grSgb'](lIi1I1,iiiIlI);}});}else IilI1['nickName']=l1lI1[l1iili[lili1I(0x285,'$ng9')]]&&Ili1I1[l1iili[lili1I(0x2ef,'Z!Wp')]][lili1I(0x373,'z*P^')]||lI1I1i[lili1I(0x272,'N(eh')];});}function i1IlI(){const Ili1=lili11,IIllII={'ZwuGr':Ili1(0x269,'k6)y'),'jlsgr':Ili1(0x277,'TKjG'),'SaHNU':function(iil1I1,iI11il){return iil1I1!==iI11il;},'iNPzb':'ktjPL','YxfUC':Ili1(0x255,'IL[O'),'Tcpff':function(iii111,liiI){return iii111===liiI;},'WDviD':Ili1(0x1fb,'8]98'),'ubchD':Ili1(0x494,'[u1o'),'RPKjw':Ili1(0x22d,'TKjG'),'NQbte':Ili1(0x408,']#2U')};return new Promise(liIII1=>{const ii11iI=Ili1,I111il={'xwiqP':IIllII[ii11iI(0x48b,'Ei1x')],'wwCWi':function(iliili,iliill){return iliili===iliill;}};console[ii11iI(0x223,'hq!l')](IIllII['RPKjw']);const l1Ili1={'url':ii11iI(0x3e8,'(yVU')+$[ii11iI(0x348,'ES97')]+'&sceneval=2&g_login_type=1','headers':{'Cookie':cookie,'User-Agent':$['UA'],'Referer':IIllII[ii11iI(0x217,'Dz7v')]},'timeout':0xa*0x3e8};$['get'](l1Ili1,(I111ii,Ililll,I1liII)=>{const i1IIl1=ii11iI;try{if(I111ii)console['log'](JSON[i1IIl1(0x27c,'JqAC')](I111ii)),console['log']($[i1IIl1(0x483,'(yVU')]+i1IIl1(0x456,'tqkV'));else{if(IIllII['ZwuGr']!==i1IIl1(0x2e8,'z*P^')){if(I1liII[i1IIl1(0x420,'@YW^')](IIllII[i1IIl1(0x2c0,'p#8F')])!==-0x1){if(IIllII['SaHNU'](IIllII[i1IIl1(0x1d0,'@YW^')],IIllII[i1IIl1(0x224,'Zlrb')])){Il1II=i1lll['parse'](Ii11I);if(I1iill[I111il[i1IIl1(0x2bf,'Dz7v')]]===0xd){Ii1III[i1IIl1(0x288,'[u1o')]=![];return;}I111il[i1IIl1(0x210,'@&7$')](i11111[I111il[i1IIl1(0x22b,'KDO(')]],0x0)?ilIIi1[i1IIl1(0x3b6,'hq!l')]=l111i['base']&&l111l[i1IIl1(0x3f3,'*gs#')][i1IIl1(0x216,'Dz7v')]||I1iilI[i1IIl1(0x436,'3vhF')]:Ii1II1[i1IIl1(0x27f,'$ng9')]=lilili[i1IIl1(0x1bf,'[u1o')];}else{console[i1IIl1(0x267,'q!eF')](IIllII[i1IIl1(0x34f,'tqkV')]);return;}}I1liII=JSON[i1IIl1(0x3d4,'q!eF')](I1liII),IIllII[i1IIl1(0x35a,'JqAC')](I1liII[i1IIl1(0x30c,'(yVU')],'0')?(console[i1IIl1(0x44e,'Rr0^')](i1IIl1(0x26d,'$AV5')+$[i1IIl1(0x3ec,')YS(')]+'个\x0a'),$[i1IIl1(0x1da,'8]98')]=0x0):console['log']('批量取消关注店铺失败，失败次数：'+ ++$[i1IIl1(0x1cc,'N(eh')]+'\x0a');}else iiili1[i1IIl1(0x287,'gY3^')](ill11i,lllill);}}catch(lii1){$[i1IIl1(0x31e,'Rr0^')](lii1,Ililll);}finally{IIllII['WDviD']===IIllII[i1IIl1(0x1d9,'tqkV')]?liIII1(I1liII):i1i1Ii['signStr']=lllii?.['data']?.[i1IIl1(0x39f,'k6)y')]||'';}});});}function lIl1Ii(iIliIi,IIil1l){const I1IIl=lili11,i1i1l1={'bNMQf':function(IlIl1,II1i1I){return IlIl1===II1i1I;},'drKSi':I1IIl(0x2a6,'A$GR'),'ezaUJ':function(iIliI1,iIii11){return iIliI1+iIii11;},'sSHFb':function(i1i1lI,IIllIi){return i1i1lI+IIllIi;},'MkQBx':function(i11l1l,IIllIl){return i11l1l+IIllIl;},'fcZzg':'http:','SvTMW':I1IIl(0x460,'ES97'),'msBXL':I1IIl(0x4a2,'3vhF'),'INxDQ':'application/json'};let iIii1i={'fn':iIliIi,'body':JSON['stringify'](IIil1l)},IIil1i={'url':i1i1l1['ezaUJ'](i1i1l1['sSHFb'](i1i1l1['MkQBx'](i1i1l1[I1IIl(0x1f7,'p#8F')],i1i1l1[I1IIl(0x294,'8]98')]),i1i1l1[I1IIl(0x1e5,'N(eh')]),I1IIl(0x26f,'J(I]')),'body':JSON[I1IIl(0x3a9,'x12J')](iIii1i),'headers':{'Accept':''+$[I1IIl(0x398,'%1z$')],'Content-Type':i1i1l1['INxDQ']},'timeout':0x7530};return new Promise(async i11l1i=>{const i1iiIi=I1IIl,iI11l1={'SJetX':i1iiIi(0x383,'IWgc'),'NjzNc':i1iiIi(0x338,'Z!Wp'),'SNBAA':function(IlIii,iI11lI){const iiliII=i1iiIi;return i1i1l1[iiliII(0x49d,'TKjG')](IlIii,iI11lI);},'rsrco':i1i1l1[i1iiIi(0x246,'1Z9J')],'XdpYw':i1iiIi(0x24f,'@YW^'),'KBtLN':function(II1i11,IlillI){return II1i11(IlillI);}};$[i1iiIi(0x226,'gY3^')](IIil1i,(I111l1,iIliII,iIii1I)=>{const i1iiIl=i1iiIi;try{if(iI11l1['SJetX']===iI11l1[i1iiIl(0x461,'W]GM')])iill1[i1iiIl(0x479,'28uX')]+=iii1l1[i1iiIl(0x367,'$AV5')]+',',IIliIl[i1iiIl(0x310,'28uX')]++;else{if(I111l1){}else{iIii1I=JSON[i1iiIl(0x499,')YS(')](iIii1I);if(iI11l1[i1iiIl(0x2ab,'TKjG')](typeof iIii1I,iI11l1[i1iiIl(0x283,'p#8F')])&&iIii1I&&iIii1I[i1iiIl(0x240,'$Byj')])$[i1iiIl(0x1c7,'IiN7')]=iIii1I[i1iiIl(0x275,'1Z9J')]||'';else{}}}}catch(I1ii11){iI11l1[i1iiIl(0x1fd,'N(eh')](iI11l1[i1iiIl(0x1b3,'ES97')],iI11l1[i1iiIl(0x36e,'[u1o')])?$[i1iiIl(0x419,'W]GM')](I1ii11,iIliII):(l1l111['log'](l1iIII[i1iiIl(0x4a0,'*gs#')](llI1I1)),IlIlil[i1iiIl(0x1e6,'W]GM')](lIli1I[i1iiIl(0x2c5,'ES97')]+i1iiIl(0x38c,'IWgc')));}finally{iI11l1[i1iiIl(0x43c,'9s[)')](i11l1i,iIii1I);}});});};function lIl1Il(iI11i1,i1i1li=lili11(0x42a,'IiN7')){const I11llI=lili11,iIill={'uwaRX':I11llI(0x2c8,'JqAC'),'WRkqA':function(iii11i,iii11l){return iii11i+iii11l;},'mJKSG':I11llI(0x213,'IWgc')};let iil1Ii='';for(let l1Ilii=0x0;l1Ilii<iI11i1;l1Ilii++){iIill['mJKSG']===iIill[I11llI(0x4a3,'(yVU')]?iil1Ii+=i1i1li[Math['floor'](Math['random']()*i1i1li[I11llI(0x1ac,'[u1o')])]:iilli[I11llI(0x286,'17&E')][I11llI(0x2e2,'N(eh')](I111i1=>i1l1Ii[I11llI(0x1b6,'9Bbq')][I11llI(0x2b3,'JqAC')](I111i1))?(I1iIIi[I11llI(0x302,'@YW^')]?I1iIIl[I11llI(0x262,'tqkV')](iIill['uwaRX']):'',lI1IIl['printLog']?i1ilI[I11llI(0x238,'$AV5')](iii1lI['shopName']+'\x0a'):'',i1ilI1[I11llI(0x409,'p#8F')]+=0x1):(Iiilii['shopIdList']+=iIill[I11llI(0x3a1,'gY3^')](Iil1li['shopId'],','),Iiilil['unsubscribeShopsNum']++);}return iil1Ii;}function Ii1IlI(lIl1i1,l1Ilil={}){const I1IIi=lili11,iIili={'HNfUq':I1IIi(0x1e1,'k6)y'),'NmDBF':function(liil,i11l11){return liil+i11l11;}};let i11l1I=[],iil1Il=l1Ilil[I1IIi(0x3a4,'KDO(')]||'&',IlIll=Object['keys'](lIl1i1);if(l1Ilil[I1IIi(0x378,'28uX')])IlIll=IlIll[I1IIi(0x2ed,'Ei1x')]();for(let IlIli of IlIll){let liIIIl=lIl1i1[IlIli];if(liIIIl&&typeof liIIIl===iIili[I1IIi(0x23e,'3vhF')])liIIIl=JSON['stringify'](liIIIl);if(liIIIl&&l1Ilil[I1IIi(0x2d4,'9s[)')])liIIIl=encodeURIComponent(liIIIl);i11l1I['push'](iIili[I1IIi(0x3c4,'hq!l')](IlIli+'=',liIIIl));}return i11l1I['join'](iil1Il);}function Il1I1I(iliil1){const iiii1I=lili11,i1i1ll={'zDDnB':function(IIllI1,lIl1iI){return IIllI1*lIl1iI;}};return iliil1[Math[iiii1I(0x2dd,'q!eF')](i1i1ll[iiii1I(0x466,'ES97')](Math[iiii1I(0x3e5,']#2U')](),iliil1[iiii1I(0x23d,'$ng9')]))];}function ll1Il1(iil1II=lili11(0x1de,'x12J'),iii11I='0123456789abcdef'){const lIlIi1=lili11,IIil11={'gUgWB':function(l1IliI,liIIIi){return l1IliI==liIIIi;},'NcHTF':function(iIilI,liii){return iIilI*liii;},'matcO':function(iliilI,I111iI){return iliilI==I111iI;}};let iI11iI='';for(let IlIlI of iil1II){if(IIil11['gUgWB'](IlIlI,'x'))iI11iI+=iii11I[lIlIi1(0x1e3,'Dz7v')](Math[lIlIi1(0x2dd,'q!eF')](IIil11[lIlIi1(0x2a0,'tqkV')](Math[lIlIi1(0x3fd,'%1z$')](),iii11I['length'])));else IIil11[lIlIi1(0x38a,'W]GM')](IlIlI,'X')?iI11iI+=iii11I['charAt'](Math['floor'](IIil11['NcHTF'](Math['random'](),iii11I['length'])))[lIlIi1(0x445,'z*P^')]():iI11iI+=IlIlI;}return iI11iI;}function li11li(IIil1I){const l1II1l=lili11,II1i1l={'ZwAKY':function(l1IllI,lIi1Ii){return l1IllI<lIi1Ii;},'arVor':l1II1l(0x264,'J(I]'),'zSoMv':function(iiilII,IIiIII){return iiilII<IIiIII;},'YckLV':function(lili,lIi1Il){return lili>lIi1Il;},'jffZF':function(Ii1lII,iliI11){return Ii1lII===iliI11;},'DPdHC':l1II1l(0x1aa,'x6jL'),'YdSbB':function(ii1iI1,ll111I){return ii1iI1>>ll111I;},'QVzxQ':function(liIl1I,IIl111){return liIl1I|IIl111;},'GeJhc':function(lill,Ill1lI){return lill&Ill1lI;},'vStPp':function(Ii1lI1,IliliI){return Ii1lI1|IliliI;},'cEGqi':function(iliI1I,ii1iII){return iliI1I&ii1iII;},'rWTWf':function(ll1111,liIl11){return ll1111|liIl11;},'QGIJy':function(i11IIl,IIl11I){return i11IIl&IIl11I;}};IIil1I=IIil1I[l1II1l(0x317,'(yVU')](/rn/g,'n');var II1i1i='';for(var Il1iiI=0x0;II1i1l[l1II1l(0x38f,'TKjG')](Il1iiI,IIil1I[l1II1l(0x3b8,'p#8F')]);Il1iiI++){if(l1II1l(0x33c,'KcB3')===II1i1l[l1II1l(0x434,']#2U')]){var iIil1=IIil1I['charCodeAt'](Il1iiI);if(II1i1l['zSoMv'](iIil1,0x80))II1i1i+=String[l1II1l(0x45f,'A$GR')](iIil1);else II1i1l[l1II1l(0x35d,'N(eh')](iIil1,0x7f)&&II1i1l[l1II1l(0x2cb,'Dz7v')](iIil1,0x800)?II1i1l[l1II1l(0x41d,')YS(')](II1i1l['DPdHC'],l1II1l(0x397,'Ei1x'))?(II1i1i+=String[l1II1l(0x202,'cgPg')](II1i1l[l1II1l(0x1be,'1Z9J')](iIil1,0x6)|0xc0),II1i1i+=String[l1II1l(0x49e,'9s[)')](II1i1l[l1II1l(0x2bb,'KcB3')](II1i1l[l1II1l(0x3e4,'W]GM')](iIil1,0x3f),0x80))):iili1[l1II1l(0x337,'8]98')]('批量取消关注店铺失败，失败次数：'+ ++II11ii['failTimes']+'\x0a'):(II1i1i+=String[l1II1l(0x221,'J(I]')](II1i1l['vStPp'](II1i1l['YdSbB'](iIil1,0xc),0xe0)),II1i1i+=String[l1II1l(0x23a,'28uX')](II1i1l['cEGqi'](iIil1>>0x6,0x3f)|0x80),II1i1i+=String['fromCharCode'](II1i1l['rWTWf'](II1i1l[l1II1l(0x368,'17&E')](iIil1,0x3f),0x80)));}else i1IiiI[l1II1l(0x419,'W]GM')](lI1I1I,l1lII);}return II1i1i;}function iliiii(illII1,Il1iii){const i1IIlI=lili11,iIiii={'RqsSi':i1IIlI(0x38d,'IWgc'),'ZBsKn':function(iliI1l,ii1iIi){return iliI1l<ii1iIi;},'ptxPw':function(iliI1i,IIl11i){return iliI1i<<IIl11i;},'vDqXm':function(i11III,ii1iIl){return i11III&ii1iIl;},'edEtS':function(Ill1l1,Ilili1){return Ill1l1>>Ilili1;},'WRmKE':function(iIiiI,Ii111i){return iIiiI|Ii111i;},'jxnFQ':function(l1iiiI,Ii111l){return l1iiiI&Ii111l;},'MMbuW':function(iI11li,lIi11){return iI11li>>lIi11;},'FKpia':function(i11II1,Ilill1){return i11II1(Ilill1);},'ZSFqS':function(I111lI,l1iii1){return I111lI(l1iii1);},'EYmbN':function(iiilIl,Il1ilI){return iiilIl+Il1ilI;},'hsylS':function(iIliIl,l1Illi){return iIliIl%l1Illi;},'vvzYM':function(iiilIi,l1Illl){return iiilIi(l1Illl);}},IIiIIl=iIiii[i1IIlI(0x2b4,'1Z9J')][i1IIlI(0x3a2,'Dz7v')]('|');let Il1iil=0x0;while(!![]){switch(IIiIIl[Il1iil++]){case'0':var iIiil,IIiIIi,lilI,ll111i,l1Ill1,iiilI1,ll111l;continue;case'1':while(iIiii['ZBsKn'](lil1,illII1['length'])){iIiil=illII1[i1IIlI(0x467,'*gs#')](lil1++),IIiIIi=illII1['charCodeAt'](lil1++),lilI=illII1[i1IIlI(0x3d9,'TKjG')](lil1++),ll111i=iIiil>>0x2,l1Ill1=iIiii[i1IIlI(0x493,'JqAC')](iIiii[i1IIlI(0x341,'KcB3')](iIiil,0x3),0x4)|iIiii['edEtS'](IIiIIi,0x4),iiilI1=iIiii[i1IIlI(0x446,'3vhF')](iIiii[i1IIlI(0x36c,'JqAC')](IIiIIi,0xf)<<0x2,iIiii[i1IIlI(0x404,']#2U')](lilI,0x6)),ll111l=lilI&0x3f;if(iIiii[i1IIlI(0x329,'^493')](isNaN,IIiIIi))iiilI1=ll111l=0x40;else iIiii[i1IIlI(0x1fc,'r6Ix')](isNaN,lilI)&&(ll111l=0x40);illIII=iIiii[i1IIlI(0x1bc,'Zlrb')](iIiii[i1IIlI(0x435,'x12J')](iIiii[i1IIlI(0x3ba,'@YW^')](illIII,Il1iii[i1IIlI(0x46b,'9Bbq')](ll111i))+Il1iii[i1IIlI(0x1e3,'Dz7v')](l1Ill1),Il1iii['charAt'](iiilI1)),Il1iii[i1IIlI(0x47d,'cgPg')](ll111l));}continue;case'2':while(iIiii[i1IIlI(0x1e8,'Z!Wp')](illIII[i1IIlI(0x3f7,'TKjG')],0x4)>0x1)illIII+='=';continue;case'3':var lil1=0x0;continue;case'4':Il1iii=Il1iii||ll1Iil;continue;case'5':return illIII;case'6':var illIII='';continue;case'7':illII1=iIiii['vvzYM'](li11li,illII1);continue;}break;}}function IIlIIi(Ii111I={}){const ii11il=lili11,iI11ll={'hlQAm':function(liIl1l,IIiII1){return liIl1l(IIiII1);},'nzsZe':'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=','sfTco':ii11il(0x2e0,'x6jL')};let liIl1i={'ciphertype':0x5,'cipher':{'ud':iI11ll[ii11il(0x3d3,'Rr0^')](iliiii,IIlII1[ii11il(0x291,'$AV5')]($[ii11il(0x1ba,'W]GM')])[ii11il(0x37f,'TKjG')]()),'sv':iI11ll[ii11il(0x1d6,'ES97')](iliiii,$['os_ver']),'iad':''},'ts':Date[ii11il(0x482,'GSM%')](),'hdid':iI11ll[ii11il(0x279,'9s[)')],'version':iI11ll['sfTco'],'appname':ii11il(0x425,'@YW^'),'ridx':-0x1};$['ep']=JSON[ii11il(0x27c,'JqAC')](liIl1i);}function iliiil(lIi1I,Ii1111={}){const il1lII=lili11,Ill1li={'UltCA':il1lII(0x3e6,'[u1o'),'rdfjD':il1lII(0x28c,'KDO('),'koOMu':il1lII(0x1c2,'^493'),'Rvugv':il1lII(0x2be,'@&7$'),'ebEld':'ios','GtkPu':il1lII(0x342,'[u1o'),'VCQUc':il1lII(0x1d3,'cgPg'),'QskuK':'14.0.1','rjZno':il1lII(0x1fa,'8]98'),'TWTre':function(Il1il1,Ililil){return Il1il1(Ililil);},'YPpRT':function(Ill1ll,I1liIl){return Ill1ll||I1liIl;},'jTFfG':function(I111li,l11li){return I111li===l11li;},'qFgnU':il1lII(0x29f,'28uX'),'ZpbZO':function(iIlli,l11ll){return iIlli==l11ll;},'hDSsd':il1lII(0x3ce,'W]GM'),'VWkbj':il1lII(0x1af,'Dz7v'),'THYek':function(Ii1ll){return Ii1ll();},'bJdoi':'app','earKP':function(iIlll){return iIlll();},'iuIME':il1lII(0x363,'[u1o'),'VinlD':il1lII(0x28e,'JqAC'),'OPBGF':il1lII(0x1c6,'Dv3s'),'tWWQw':il1lII(0x490,'tqkV'),'icmPa':il1lII(0x1e4,'A$GR'),'eKTGM':il1lII(0x225,'N(eh'),'AtZJw':'jdSupportDarkMode/0','WwldT':'ef/1','WLlNG':function(liII11,I1II){return liII11(I1II);},'rAaDC':il1lII(0x2a7,'z*P^')},Ililii={'jd':{'app':Ill1li['UltCA'],'appBuild':il1lII(0x498,'IWgc'),'client':Ill1li[il1lII(0x3d2,'3vhF')],'clientVersion':Ill1li[il1lII(0x392,'1Z9J')]},'lite':{'app':Ill1li[il1lII(0x3db,'IWgc')],'appBuild':il1lII(0x3df,'Zlrb'),'client':Ill1li[il1lII(0x401,'9s[)')],'clientVersion':il1lII(0x233,'TKjG')}},I111ll=[il1lII(0x49a,'cgPg'),'14.5.1','14.4',Ill1li['GtkPu'],Ill1li[il1lII(0x3fa,'[u1o')],il1lII(0x330,'IL[O'),Ill1li[il1lII(0x2ad,'TKjG')],Ill1li[il1lII(0x256,'KDO(')]];$[il1lII(0x3e1,'q!eF')]=Ill1li[il1lII(0x3f0,'IL[O')](Il1I1I,I111ll);let I1liIi=Ill1li[il1lII(0x21b,'3vhF')](lIi1I,'jd'),I1ii1i=Ii1111?.['ep']?Ii1111?.['ep']:!![];if(!Ililii[I1liIi]){if(Ill1li['jTFfG'](Ill1li[il1lII(0x29e,'A$GR')],il1lII(0x25e,'N(eh'))){console['log'](il1lII(0x261,'@YW^')+I1liIi+il1lII(0x23c,'$AV5'));return;}else l1liii[il1lII(0x42e,'x6jL')]=I1Ili1[il1lII(0x2c1,'r6Ix')];}$[il1lII(0x431,'(yVU')]=Ii1111?.[il1lII(0x2d9,'*gs#')]?Ii1111?.[il1lII(0x2bc,'Z!Wp')]:Ililii[I1liIi][il1lII(0x365,'9s[)')],$['clientVersion']=Ii1111?.[il1lII(0x3dc,'z*P^')]?Ii1111?.[il1lII(0x237,'9s[)')]:Ililii[I1liIi][il1lII(0x2f3,'tqkV')],$['sua']=il1lII(0x3bd,')YS(')+$[il1lII(0x314,'[u1o')]['replace']('.','_')+il1lII(0x32f,'$Byj');let I1ii1l=il1lII(0x3cd,'JqAC');Ill1li['ZpbZO']($['client'],Ill1li[il1lII(0x21e,'Zlrb')])&&(I1ii1l=Ill1li[il1lII(0x3c2,'Rr0^')]);Ill1li[il1lII(0x26c,'q!eF')](IIlIIi);let iIii1=[Ililii[I1liIi][Ill1li['bJdoi']],I1ii1l,$[il1lII(0x415,'pKFk')],'','rn/'+Ill1li[il1lII(0x439,'[u1o')](ll1Il1),Ill1li[il1lII(0x46a,'tqkV')],Ill1li[il1lII(0x311,'ES97')],Ill1li['OPBGF'],Ill1li['tWWQw'],Ill1li['icmPa'],il1lII(0x2ca,'$Byj')+Ililii[I1liIi][Ill1li['eKTGM']],il1lII(0x370,'W]GM'),Ill1li['AtZJw'],Ill1li[il1lII(0x300,'W]GM')],I1ii1i?il1lII(0x25a,'(yVU')+Ill1li[il1lII(0x24b,'hq!l')](encodeURIComponent,$['ep']):'','Mozilla/5.0\x20('+$[il1lII(0x1c0,'cgPg')]+il1lII(0x387,'$Byj'),Ill1li[il1lII(0x444,'IWgc')],''];$['UA']=iIii1[il1lII(0x3d6,'pKFk')](';');}function li11ll(){const iIi111=lili11,l1li1I={'GhTcE':function(iIlli1,I1IIIl){return iIlli1|I1IIIl;},'ukJqO':function(il1IlI,I1IIIi){return il1IlI|I1IIIi;},'ZIwow':function(lI11,li11I1){return lI11&li11I1;},'cwYZZ':function(i1I111,l1li11){return i1I111===l1li11;},'kQBxx':iIi111(0x327,'[u1o'),'LTEdA':function(il1Il1,li11II){return il1Il1===li11II;},'GTAyG':function(Ii1li,iIiIli){return Ii1li===iIiIli;},'cfCHp':iIi111(0x328,'r6Ix'),'HuYhK':function(iIllI,iIiIl1){return iIllI!==iIiIl1;},'sFakH':iIi111(0x369,'^493'),'hFGxK':iIi111(0x468,'$Byj'),'lcsmj':'base','CwyDZ':iIi111(0x463,'@YW^'),'FvOkm':iIi111(0x24c,'9s[)'),'ISFtf':iIi111(0x26b,'(yVU'),'dVtvU':iIi111(0x298,'k6)y'),'graSr':iIi111(0x352,'Zlrb'),'ZlXVg':iIi111(0x40d,'(yVU'),'Krhju':iIi111(0x1b5,'Zlrb'),'gyAcI':iIi111(0x3d8,'IWgc'),'YTQKl':iIi111(0x33e,'28uX'),'SqwJs':iIi111(0x2e7,'J(I]'),'ktejd':iIi111(0x2af,'hq!l')};return new Promise(async i1I11I=>{const ii11ii=iIi111,Ii1lli={'rTojC':l1li1I[ii11ii(0x1d7,'x6jL')]};if(ii11ii(0x303,'@YW^')===l1li1I[ii11ii(0x31b,'@YW^')]){const Ii1lll={'url':ii11ii(0x47c,'17&E'),'headers':{'Accept':l1li1I[ii11ii(0x391,'JqAC')],'Content-Type':l1li1I[ii11ii(0x40f,'J(I]')],'Accept-Encoding':l1li1I[ii11ii(0x39c,'x6jL')],'Accept-Language':l1li1I[ii11ii(0x47f,'3vhF')],'Connection':l1li1I[ii11ii(0x47b,'J(I]')],'Cookie':cookie,'Referer':ii11ii(0x432,'GSM%'),'User-Agent':$['UA']}};$[ii11ii(0x465,'IL[O')](Ii1lll,(I1IIII,I1I1,Ii1lI)=>{const il1lI1=ii11ii,iIiIlI={'cXzzj':function(liII1i,iIiIil){return l1li1I['GhTcE'](liII1i,iIiIil);},'ujnAD':function(iIiIii,lI1i){return l1li1I['ukJqO'](iIiIii,lI1i);},'Pvsqn':function(i11,Ii1llI){const ll1l11=iii1II;return l1li1I[ll1l11(0x3a6,'TKjG')](i11,Ii1llI);},'NLUnG':function(i1I11i,lI1l){const iIl1I1=iii1II;return l1li1I[iIl1I1(0x24d,'r6Ix')](i1I11i,lI1l);}};if(l1li1I['cwYZZ'](l1li1I[il1lI1(0x2eb,'9s[)')],il1lI1(0x29c,'Rr0^')))IlllII[il1lI1(0x428,'p#8F')](I1il1I,II111);else try{if(I1IIII)console[il1lI1(0x34c,'Dv3s')](''+JSON['stringify'](I1IIII)),console[il1lI1(0x28f,'IL[O')]($[il1lI1(0x231,'8]98')]+'\x20API请求失败，请检查网路重试');else{if(Ii1lI){Ii1lI=JSON['parse'](Ii1lI);if(l1li1I[il1lI1(0x3e3,'TKjG')](Ii1lI[il1lI1(0x40a,'9Bbq')],0xd)){$[il1lI1(0x3ca,'p#8F')]=![];return;}l1li1I[il1lI1(0x496,'Zlrb')](Ii1lI[l1li1I[il1lI1(0x1b7,'3vhF')]],0x0)?l1li1I[il1lI1(0x2fd,'Ei1x')](l1li1I['sFakH'],l1li1I[il1lI1(0x3ee,'(yVU')])?$[il1lI1(0x313,'Dv3s')]=Ii1lI['base']&&Ii1lI[l1li1I[il1lI1(0x2d3,'J(I]')]][il1lI1(0x2ac,'3vhF')]||$[il1lI1(0x1ba,'W]GM')]:iIiII[il1lI1(0x20c,'@YW^')](il1lI1(0x340,'IWgc'),iil1lI):l1li1I['cwYZZ'](l1li1I[il1lI1(0x2f8,'9Bbq')],l1li1I[il1lI1(0x49b,'$AV5')])?II11l[il1lI1(0x1ca,'IL[O')](II11i,iI1Iii):$[il1lI1(0x318,')YS(')]=$[il1lI1(0x475,'JqAC')];}else{if(l1li1I[il1lI1(0x2bd,'W]GM')]!==il1lI1(0x42c,'Rr0^'))return l1Ii1[il1lI1(0x47e,'Rr0^')](i1IilI);else console[il1lI1(0x38b,'$ng9')]('京东服务器返回空数据');}}}catch(Ii1ll1){$[il1lI1(0x22f,'8]98')](Ii1ll1,I1I1);}finally{'ddzGv'===l1li1I[il1lI1(0x3f2,'TKjG')]?i1I11I():(iI1lII+=ll11iI['fromCharCode'](iIiIlI['cXzzj'](l1i1I>>0xc,0xe0)),l1llll+=I1I1ll[il1lI1(0x427,'Dz7v')](iIiIlI[il1lI1(0x1fe,')YS(')](iIiIlI['Pvsqn'](lil1i>>0x6,0x3f),0x80)),liiiil+=IIIIli[il1lI1(0x265,'Rr0^')](iIiIlI['NLUnG'](lllIi,0x3f)|0x80));}});}else il1i1i[ii11ii(0x3b4,'Ei1x')](Ii1lli['rTojC']);});}function i1Il1(iIll1){const i111li=lili11,l11li1={'bvnca':function(i1I,liII1I){return i1I|liII1I;},'hXSDb':function(iIiIiI,iIlil){return iIiIiI&iIlil;},'uYQtA':function(lIiII1,iIlii){return lIiII1>>iIlii;},'ofXSD':function(lI1I,I1Ii){return lI1I(I1Ii);},'RcwnI':function(I1Il,l1li1i){return I1Il+l1li1i;},'TtIJY':function(l1li1l,il1Ill){return l1li1l+il1Ill;},'SEoWk':function(il1Ili,i1IlI1){return il1Ili+i1IlI1;},'rsBMH':function(IIlIli,IIlIll){return IIlIli*IIlIll;},'gxsvF':i111li(0x3ab,'cgPg'),'LSPlK':function(l11liI,li11Ii){return l11liI+li11Ii;},'MQMRW':function(lIiIII,i1i){return lIiIII+i1i;},'zztIi':function(I1Il1l,I1Il1i){return I1Il1l==I1Il1i;},'oprAP':i111li(0x1ed,'N(eh'),'eTMYf':function(i1l,IlIiII){return i1l!==IlIiII;},'kZhfa':i111li(0x2f9,']#2U'),'hRRlj':i111li(0x3c9,'x6jL'),'wEAPn':function(iIliI,i1IlII){return iIliI===i1IlII;},'JrCCQ':i111li(0x43f,'Rr0^'),'HmweX':'请勿随意在BoxJs输入框修改内容\x0a建议通过脚本去获取cookie'};if(l11li1['zztIi'](typeof iIll1,l11li1['oprAP'])){if(l11li1['eTMYf'](l11li1[i111li(0x469,'IiN7')],i111li(0x457,'z*P^'))){llIiI=Ilill[i111li(0x32a,'r6Ix')](Ilili++),I1ll1I=Iii1I1[i111li(0x405,'$ng9')](i11iI1++),Iii1II=llIlI[i111li(0x450,'hq!l')](l1iIil++),l1iIii=illllI>>0x2,II1II=(ii1l11&0x3)<<0x4|IIIIii>>0x4,liiill=l11li1[i111li(0x30f,'pKFk')](l11li1['hXSDb'](IIIIil,0xf)<<0x2,l11li1[i111li(0x46e,'Zlrb')](lI1lIl,0x6)),liiili=l11li1[i111li(0x371,'IWgc')](I1ll11,0x3f);if(lI1lIi(Iii1Ii))iIiil1=l1lI1i=0x40;else l11li1['ofXSD'](lI1lI1,llIl1)&&(l1lI1l=0x40);illlli=l11li1[i111li(0x324,'tqkV')](l11li1[i111li(0x3b9,'*gs#')](l11li1[i111li(0x37d,'^493')](illlll,IIIIiI[i111li(0x3c3,'@&7$')](II1I1)),i1i111['charAt'](ii1l1I))+lI1lII[i111li(0x315,']#2U')](lIill1),iiI1i1['charAt'](ilIlII));}else try{if(l11li1['eTMYf'](l11li1[i111li(0x44c,'q!eF')],l11li1[i111li(0x3d5,'*gs#')]))IIIli+=ii1i1['charAt'](Iiii[i111li(0x2fb,'$ng9')](l11li1[i111li(0x207,'x12J')](llIl11['random'](),IIIll[i111li(0x1ef,'%1z$')])));else return JSON[i111li(0x3fb,'8]98')](iIll1);}catch(ll1II1){if(l11li1[i111li(0x3a8,'k6)y')](i111li(0x3ac,'@YW^'),l11li1[i111li(0x2a2,'Ei1x')])){let IIlIii=[],l11lil=ll1Ii['connector']||'&',iIllli=ll1Il['keys'](iiIi11);if(ill1II[i111li(0x41b,'$AV5')])iIllli=iIllli[i111li(0x346,'KcB3')]();for(let iIlll1 of iIllli){let ilIiiI=IIlIl[iIlll1];if(ilIiiI&&typeof ilIiiI===l11li1[i111li(0x477,')YS(')])ilIiiI=ili11l['stringify'](ilIiiI);if(ilIiiI&&Iiilll[i111li(0x208,'28uX')])ilIiiI=l11li1[i111li(0x1c1,']#2U')](Iiilli,ilIiiI);IIlIii['push'](l11li1[i111li(0x47a,'$AV5')](l11li1[i111li(0x399,'q!eF')](iIlll1,'='),ilIiiI));}return IIlIii[i111li(0x282,'%1z$')](l11lil);}else return console[i111li(0x200,'9Bbq')](ll1II1),$['msg']($['name'],'',l11li1[i111li(0x45b,'$ng9')]),[];}}}var version_ = 'jsjiami.com.v7';
// prettier-ignore
function Env(t, e){
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s{
        constructor(t){
            this.env = t
        }

        send(t, e = "GET"){
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t){
            return this.send.call(this.env, t)
        }

        post(t){
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class{
        constructor(t, e){
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode(){
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX(){
            return "undefined" != typeof $task
        }

        isSurge(){
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon(){
            return "undefined" != typeof $loon
        }

        toObj(t, e = null){
            try{
                return JSON.parse(t)
            } catch{
                return e
            }
        }

        toStr(t, e = null){
            try{
                return JSON.stringify(t)
            } catch{
                return e
            }
        }

        getjson(t, e){
            let s = e;
            const i = this.getdata(t);
            if(i) try{
                s = JSON.parse(this.getdata(t))
            } catch{}
            return s
        }

        setjson(t, e){
            try{
                return this.setdata(JSON.stringify(t), e)
            } catch{
                return !1
            }
        }

        getScript(t){
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e){
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata(){
            if(!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if(!s && !i) return {};
                {
                    const i = s ? t : e;
                    try{
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch(t){
                        return {}
                    }
                }
            }
        }

        writedata(){
            if(this.isNode()){
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s){
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for(const t of i)
                if(r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s){
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t){
            let e = this.getval(t);
            if(/^@/.test(t)){
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if(r) try{
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch(t){
                    e = ""
                }
            }
            return e
        }

        setdata(t, e){
            let s = !1;
            if(/^@/.test(e)){
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try{
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch(e){
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t){
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e){
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t){
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})){
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try{
                    if(t.headers["set-cookie"]){
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch(t){
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})){
            if(t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if(this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if(this.isNode()){
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null){
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for(let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r){
            const o = t => {
                if(!t) return t;
                if("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if("object" == typeof t){
                    if(this.isLoon()){
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if(this.isQuanX()){
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if(this.isSurge()){
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if(this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog){
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t){
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e){
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t){
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}){
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
