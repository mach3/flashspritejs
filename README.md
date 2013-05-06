
# FlashSprite.js

## これはなに

Adobe Flash CS6+ で出力されたスプライトアニメーションシートを再生するjQueryベースのライブラリ。

Flash自体にはCreateJS形式等で書きだす機能がありますので
それらを使えば用のないライブラリですが、

- あまり色々ライブラリを読み込みたくない
- 宗教上の理由でどうしてもjQueryで再生したい

などのご要望にお応えする物です。

## クイックスタート

### 1. スプライトシートの作成

まずAdobe Flash CS6+ でスプライトシートを書き出して任意の場所へ保存します。  
※ 形式は「JSON Array」を選択。

画像ファイルとJSONファイルは同じディレクトリに保存するか、
別の場所にしたい場合はJSONファイル内の `meta.image` をJSONファイルからの相対パスで書き換える必要があります。

### 2. 配置と初期化

コンテナとなる任意の要素をHTML上に配置し、

```html
<div id="my-animation"></div>
```

$.fn.flashSprite() で初期化します。
引数のsrcオプションでスプライトシートのJSONファイルへのパスを指定してください。

```javascript
$("#my-animation").flashSprite({
	src : "the/path/to/sprite.json"
});
```

## メソッド

各メソッド名を第一引数に渡してコールできます。
第二引数以降はメソッドに渡されます。

```javascript
$("#my-animation").flashSprite("stop"); // 停止する
$("#my-animation").flashSprite("config", { fps : 60 }); // FPSを60に変更
$("#my-animation").flashSprite("gotoAndPlay", 10); // 10フレーム目に移動して再生
```

- init() - 初期化する（省略時の初期値）
- play() - 再生する
- stop() - 停止する
- reverse() - 逆再生する
- gotoAndStop(frame:Integer) - nフレーム目に移動して停止する
- gotoAndPlay(frame:Integer) - nフレーム目に移動して再生する
- config(option:Object) - 設定を変更する

## オプション

- src : Strng (null) - JSONファイルへのパス
- autoPlay : Boolean (true) - 自動再生をする・しない
- fps : Integer (30) - アニメーションのFPS（再生速度）

※初期化以降の"config"メソッドでの再指定で効果があるのはfpsのみです。


## イベント

FlashSpriteが初期化され、JSONファイルと画像ファイルがロードされたタイミングで "flashSpriteReady" イベントが発火されます。

```javascript
var node = $("#my-animation");
// 自動再生をオフにし、ロード完了時にフェードイン・再生する
node.on("flashSpriteReady", function(){
	node.fadeIn().flashSprite("play");
});
node.flashSprite({
	src : "the/path/to/sprite.json",
	autoPlay : false
});
```

## 作者

mach3

- [Blog](http://blog.mach3.jp)
- [Website](http://www.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
