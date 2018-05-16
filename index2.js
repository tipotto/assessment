(function() {
  'use strict';
  const userNameInput = document.getElementById('name');
  const assessmentButton = document.getElementById('button');
  const resultDiv = document.getElementById('result');
  const tweetDiv = document.getElementById('tweet');

  var remove = function(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  
  // 無名関数は、function(){}を() => {}と書くことができる。
  // button.onclick = function() {
  button.onclick = () => { 
    // userNameInputをconsole.logで出力すると、<input id="name" type="text" size="40" maxlength="20">が出力される。
    // userNameInput.valueを出力すると、input欄に入力した情報が出力される。
    const userName = userNameInput.value;
    if(userName.length === 0) { return; }
  
    // 診断結果表示エリアの作成
    // h3を作り、変数headerに格納する。変数header（に格納されたh3）をresultDiv（id="result"のdiv）にappendする。
    // resultDiv（id="result"のdiv）には、'診断結果'を表示する。

    remove(resultDiv);
    const header = document.createElement('h3');
    resultDiv.appendChild(header);
    header.innerText = '診断結果';

    const paragraph = document.createElement('p');
    resultDiv.appendChild(paragraph);
    // assessment(userName)を実行することで得られる診断結果を、resultに格納する。
    const result = assessment(userName);
    paragraph.innerText = result;
  };
  
  const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振舞に多くの人が癒やされています。'
　];

  // 名前の文字列を渡すと、診断結果を返します。
  var assessment = function(userName) {
    // sumOfcharCodeを初期化
    let sumOfcharCode = 0; 
    for (let i = 0; i < userName.length; i++) {
       // Yuji.charCodeAt(i) i = 0 ~ 3
      // for文を回し、0 ~ 3のインデックスをもれなく抽出し、Y,u,j,iのそれぞれに対してcharCodeAt()関数をかけて整数値をだす。
      // 整数値は、1文字ごとに足されていき、全ての文字の整数値を足し合わせる。
      sumOfcharCode = sumOfcharCode + userName.charCodeAt(i); 
    }
    
    // sumOfcharCodeをanswers.lengthで割った余りをindexに格納し、そのindexで性格診断のパターンを選び出す。（選んだパターンはresultに格納する。）
    const index = sumOfcharCode % answers.length;
    // TODO {userName}をユーザーの名前に置き換える。
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
  }

  console.assert(
    assessment('yuji') === 'yujiのいいところはまなざしです。yujiに見つめられた人は、気になって仕方がないでしょう。', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.assert(
    assessment('yuji') === assessment('yuji'), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
})();
