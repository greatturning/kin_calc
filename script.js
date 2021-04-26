$(function(){
  //タイトル：グレートターニング様向けKIN計算ページ
  //内容：
  //  １．今日の日付からその日のKINを算出し、メッセージを表示する。
  //  ２．指定した年月のKINを算出し、メッセージを表示する。
  //初版：2021-03-29(KIN105　赤い蛇-赤い蛇　第３の城)
  //rev.1：2021-04-06(メッセージ内容の変更　今日のK I Nは？変更点 20210404.docx)
  //rev.2：2021-04-26 今日のKINは？城メッセージ後半　起承転結を除く
  //発行元：スーパー事務局
  
  //
  //グローバル変数宣言
  // 
  //銀河の音  idx_oto = kin % 13  
   var gOtoList =
   [	'宇宙', '磁気',	'月',	'電気',	'自己存在',	'倍音',	'律動',	'共振',	
   '銀河',	'太陽',	'惑星',	'スペクトル',	'水晶'];
  //前の太陽の紋章 idx_mae = kin % 20 
  var gMaeList =
  [	'黄色い太陽' ,'赤い竜',	'白い風',	'青い夜',	'黄色い種',	'赤い蛇',	
  '白い世界の橋渡し',	'青い手',	'黄色い星',	'赤い月',	'白い犬',	
  '青い猿',	'黄色い人',	'赤い空歩く人',	'白い魔法使い',	'青い鷲',	
  '黄色い戦士',	'赤い地球',	'白い鏡',	'青い嵐','黄色い太陽'];
//後ろの太陽の紋章 idx_ushiro = kin/ 13(切り下げ)
var gUshiroList = 
  ['赤い竜',	'白い魔法使い',	'青い手',	'黄色い太陽',	'赤い空歩く人',	
  '白い世界の橋渡し',	'青い嵐',	'黄色い人',	'赤い蛇',	'白い鏡',	
  '青い猿',	'黄色い種',	'赤い地球',	'白い犬',	'青い夜',
  '黄色い戦士',	'赤い月',	'白い風',	'青い鷲','黄色い星'];
//後ろの太陽の紋章の順番
var gUshiroIDList = [1,	14,	7,	20,	13,	6,	19,	12,	5,	18,	11,	4,	17,	10,	3,	16,	9,	2,	15,	8  ];
//城のメッセージ (rev.1 2021-04-06 メッセージ変更)
var gShiroList = 
  ['第1の城　赤　始まり（創始）',	'第2の城　初心にかえる（洗練）',	'第3の城　変化・展開（変容）',	'第4の城　答えが見えてくる（熟成）',	'第5の城　まとめ（母体）',	'第5の城　緑　まとめ（母体）'];
//城の色
var gShiroColorList =
  ['green','red','white','blue','yellow'];
//サイクルのメッセージ　(rev.1 2021-04-06 メッセージ変更)
var gCycleList = 
  ['起　始まり（創始）',	'承　初心にかえる（洗練）',	'転　変化・展開（変容）',	'結　答えが見えてくる（熟成）'];
//サイクルの色
var gCycleColorList =
  ['red','white','blue','yellow'];


/*
関数名: onLoad()
説明　:画面ロード時に実行される関数
     ・今日のKINを計算して表示する
*/
window.onload = onLoad;
  function onLoad() {
    
    //今日の日付を取得
    var today = new Date()  ;
    //(不具合）Microsoft Edgeの場合 +18時間 today.setTime(today.getTime() + 1000*60*60*18);// JSTに変換 +18時間
    //   2021-03時点では、Edgeの不具合。PCのタイムゾーン設定を別地域にして戻すとなおる。
 
    //console.log("today>" +today);
  
    var yyyy = today.getFullYear();
    var mm = today.getMonth() +1;
    var dd = today.getDate();

    var today0 = document.getElementById("today0");
    today0.innerHTML = yyyy +'年' + mm + '月' + dd +'日' ; 
    today0.style.textDecorationLine = "underline";

    //KIN計算
    var kin =  kinCalc(yyyy,mm,dd);//指定した日付のKIN
   
    //console.log("kin" + kin);
    var kinMaeNo = kinMae(kin);//KINに応じた前の太陽の紋章
    var kinUshiroNo = kinUshiro(kin);///KINに応じた後ろの太陽の紋章
    var otoNo = kinOto(kin);//音
    var colorNo = kinUshiroNo % 4 ;//後ろの太陽の紋章の色
    var shiroNo = Math.floor((kin-1) / 52)+1 ;//城
    
    //
    //HTMLに値を設定
    //
    //銀河のマヤツォルキンで
    //
    //銀河のマヤツォルキンでは、今日は
    //KIN (99) 「(音) (前の太陽の紋章) - (後ろの太陽の紋章)」
    var todaysKIN = document.getElementById("todaysKIN");
    todaysKIN.innerHTML = kinMsg(kin);
    todaysKIN.classList.add('underline','bold');

    //(後ろの太陽の紋章)の13日間の
    var dUshiro = document.getElementById("dUshiro");
    dUshiro.innerHTML = gUshiroList[kinUshiroNo];
    dUshiro.classList.add('marker_' + gCycleColorList[colorNo ]);//マーカー 
    //dUshiro.classList.add( gCycleColorList[colorNo ],'bold','underline');//文字色

    //(音)日目
    var dOto1 = document.getElementById("dOto1");
    dOto1.innerHTML = otoNo;
    dOto1.classList.add('underline','bold' );
   
    //銀河の音(音)の日です。
    var dOto2 = document.getElementById("dOto2");
    dOto2.innerHTML = otoNo;
    dOto2.classList.add('underline','bold' );
    
    //52日周期では第(城)の城です。
    var dShiro0 = document.getElementById("dShiro0");
    dShiro1.innerHTML = shiroNo;
    dShiro0.classList.add('underline' );
    dShiro1.classList.add('bold' );

    //第(城)の城　（城メッセージ）の52日間の中で
    var dShiroMsg = document.getElementById("dShiroMsg");
    dShiroMsg.innerHTML = gShiroList[shiroNo-1];
    dShiroMsg.classList.add('marker_' + gShiroColorList[shiroNo % 5 ] );//マーカー 
    //dShiroMsg.classList.add( gShiroColorList[shiroNo % 5 ] ,'bold','underline');//文字色
    //(サイクル)の13日間です。
    var dCycle  = document.getElementById("dCycle");
    dCycle.innerHTML = gCycleList[colorNo].slice(2); //2021-04-26 メッセージから起承転結を除く
    dCycle.classList.add('marker_' + gCycleColorList[colorNo ],'bold','underline' );//マーカー 
    //dCycle.classList.add( gCycleColorList[colorNo ],'bold','underline' );//文字色

    //イメージ前の太陽の紋章
    var imgMae= document.getElementById("imgMae");
    var imgMaeURL = "./img/monsho/" + kinMaeNo + gMaeList[kinMaeNo%20] + ".jpg";

    //console.log(imgMaeURL);
    imgMae.src = imgMaeURL;
    imgMae.title = imgMaeURL;

    //イメージ後ろの太陽の紋章
    var imgUshiro = document.getElementById("imgUshiro");
    var imgUshiroURL = "./img/monsho/" + gUshiroIDList[kinUshiroNo]  + gUshiroList[kinUshiroNo] + ".jpg";
    //console.log(imgUshiroURL);
    imgUshiro.src = imgUshiroURL;
    imgUshiro.title = imgUshiroURL;
   
    //イメージ　音
    var imgOto = document.getElementById("imgOto");
    imgOto.title = "音" + otoNo + ":" + gOtoList[otoNo%13];
    imgOto.src = "./img/oto/oto" + otoNo + ".jpg";
  }
 
  /*
  関数名: document.getElementById("yourkin-button").onclick
  説明　: 「あなたのKINは」ボタンクリック時に起動。
          誕生日をselectboxから指定してもらい
          あなたのKINを計算します。
    ・    誕生日に応じてKINを算出する
  */
document.getElementById("yourkin-button").onclick = function() {
  //誕生日情報を取得
  var yyyy = document.getElementById("_yy").value;
  var mm = document.getElementById("_mm").value;
  var dd = document.getElementById("_dd").value;

  //日付として成立しないときエラーメッセージを表示する
  var m = mm-1;
  var date0= new Date(yyyy,mm-1,dd);
  if( date0.getMonth() != m ){
    alert("日付が無効です。") ;   
    return false;
  }
  
  //KIN計算
  var kin =  kinCalc(yyyy,mm,dd);
  //console.log("kin" + kin);

  //
  //HTMLに値を設定
  //
  //誕生日のメッセージ
  var yourKIN = document.getElementById("yourKIN");
  yourKIN.innerHTML =  kinMsg(kin);
  //rev.1 yourKIN.classList.add('bold','underline');
  yourKIN.classList.add('bold','yourKIN-class','underline');//アンダーライン削除 レスポンシブ対応用クラス追加
  //rev.1 レスポンシブ対応のためコメントアウト yourKIN.style.fontSize = "25px";

  //イメージを表示する
  var kinMaeNo = kinMae(kin);//KINに応じた前の太陽の紋章
  var kinUshiroNo = kinUshiro(kin);///KINに応じた後ろの太陽の紋章
  var otoNo = kinOto(kin);//KINに応じた音

  //イメージ前の太陽の紋章
  var imgMae= document.getElementById("imgMaeY");
  var imgMaeURL = "./img/monsho/" + kinMaeNo + ".jpg"; ;

  // console.log(imgMaeURL);
  imgMae.src = imgMaeURL;
  imgMae.title = imgMaeURL;

  //イメージ後ろの太陽の紋章
  var imgUshiro = document.getElementById("imgUshiroY");
  console.log(kinUshiroNo);
  var imgUshiroURL = "./img/monsho/" + gUshiroIDList[kinUshiroNo]  + ".jpg";
  console.log(imgUshiroURL);
  imgUshiro.src = imgUshiroURL;
  imgUshiro.title = imgUshiroURL;

  //イメージ音
  var imgOto = document.getElementById("imgOtoY");
  imgOto.title = "音" + otoNo + ":" + gOtoList[otoNo%13];
  imgOto.src = "./img/oto/" + otoNo + "（"+ gOtoList[otoNo%13] + "）.png";
  console.log(imgOto.src);


};
  /*
    関数名:function kinCalc(yyyy,mm,dd)
    説明：KIN計算
    ：(計算日 - 基準日)の260の剰余がKIN
    ・基準日はKIN260の日
    ・日数からうるう年分の日数は除く
    ・うるう年の3/1以降は＋１（フナブクの日を足す）
  */
  function kinCalc(yyyy,mm,dd) {
    //console.log ("入力された日付"+yyyy+mm+dd);

    //基準日：KIN 1の日の前日
    var baseDate = new Date(1909, 10-1, 31); //"1909/10/31";

    //KINを計算する日
    var birthday = new Date(yyyy ,mm-1,dd);

    //console.log("birthday>"+ birthday);

    //基準日から計算日までの日数
    var dateCount = (birthday - baseDate) / 86400000;
    //console.log("dateCount" + dateCount);
    //console.log("Math.floor((yyyy - yyyy/4)"+ Math.floor((yyyy - yyyy/4) ));
    //console.log(yyyy / 4);

    //うるう年分の日数を引いて 260で割ったときの剰余がKIN
    var a1 = (dateCount  -Math.floor((yyyy - 1909)/4) ) % 260 ;
     
    //ただし、うるう年で02/29以降の場合はフナブク分を+1する。
      //現在のグレゴリオ暦では、うるう年の決め方は以下の規則によっています。
      //1.西暦年数が4で割り切れる年は原則として「うるう年」にする。
      //2.上記の例外として、西暦年数が100で割り切れる年は「平年」とする。
      //3.さらに例外として、西暦年数が400で割り切れる年は「うるう年」にする。
      //この規則によりますと、2000年は400で割り切れますから「うるう年」になります。 一方1900年、2100年、2200年などは平年になります。

    if(yyyy % 4 == 0 && (Number( mm)*100 + Number(dd)) >= 229) return a1;
     
     return a1+1;
  }
  /*
    関数名: kinOto(kin) 
    説明　: KINに応じた音の番号を返す。
  */
  function kinOto(kin) {
    var idx_oto = kin % 13;
    var otoNo = idx_oto;
    if (otoNo === 0 ) {
      otoNo = 13 ;
    }
    return otoNo;
  }
  /*
    関数名: kinMae(kin) 
    説明　: KINの前の太陽の紋章インデックスを返す
  */
  function kinMae(kin) {
      var idx_mae = kin % 20;
      var maeNo = idx_mae;
      if (maeNo === 0 ) {maeNo = 20;}
       return maeNo;
    
    }

  /*
    関数名: kinUshiro(kin) 
    説明　: KINの後ろの太陽の紋章インデックスを返す
  */
  function kinUshiro(kin) { 
    console.log("kin=" + kin +" kinUshiro=" + Math.floor((kin -1)/ 13));
    return Math.floor((kin-1) / 13);
  }

 /*
    関数名: kinUshiro(kin) 
    説明　: KINに応じたメッセージを返す
    　　　　KIN xxxx 「銀河の音(銀河の音名称)前の太陽の紋章 - 後ろの太陽の紋章」
  */
  //KINに応じたメッセージ、色を計算する
  function kinMsg(kin) {
    var otoNo = kinOto(kin);
    var idx_mae =kinMae(kin)  ;

    var idx_ushiro = kinUshiro(kin);
    //console.log("idx_ushiro:" + idx_ushiro);

    //メッセージ出力内容 
    //KIN xxxx 「銀河の音(銀河の音名称)前の太陽の紋章 - 後ろの太陽の紋章」
   var msg = 
      "KIN " + kin + 
      " 「" + 
      otoNo +"(" + gOtoList[otoNo%13] + ")" +
      gMaeList[idx_mae] + " - " + gUshiroList[idx_ushiro] 
      + "」";
    return msg ;
   
  }
      
  /*
    関数名：document.getElementById("btn_GT").onclick
    説明：　会社概要ボタンを押された時の処理
    　　　　会社ホームページへ飛ぶ。
  */
  document.getElementById("btn_GT").onclick = function() {
    window.open('http://great-turning.main.jp/', '_blank');   
  }

});
