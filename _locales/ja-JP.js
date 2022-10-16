import{a}from"./chunk-VI23SD3N.js";var t={ui:{quest_info:{title:()=>"クエスト情報",max_players_info:e=>"このクエストは最大"+e.value+"人のプレイヤーでプレイできます",enemy_level:{title:()=>"出現エネミーLv.",content:e=>"Lv."+e.level},recommended_power:{title:()=>"推奨能力値",content:e=>"戦闘力"+e.power+"以上"},main_mission:()=>"メインミッション",side_missions:()=>"サイドミッション",fail_conditions:()=>"失敗条件",first_clear_rewards:()=>"初回クリア報酬",rewards:()=>"報酬",rank_select_option:e=>"【Rank."+e.rank+"】 エネミーLv."+e.level},map_legend:{title:()=>"地図の凡例",reset_option:()=>"可視マーカーをリセット"},settings:{title:()=>"セッティング",language_option:()=>"言語",settings_change_msg:()=>"一部の設定が変更されました。有効にするには、ページをリロードする必要があります。",settings_change_btn:()=>"リロード"},languages:{"en-US":()=>"英語","ja-JP":()=>"日本語"},landmarks:()=>"ランドマーク",minerals:()=>"鉱石",vegetables:()=>"野菜",fruits:()=>"果物",seafoods:()=>"魚介"},markers:{battledias:()=>"バトルディア",cocoons:()=>"コクーン",mags:()=>"リージョンマグ",ryukers:()=>"リューカーデバイス",towers:()=>"タワー",trinitas:()=>"トリニテス",urgents:()=>"緊急クエスト",kvaris_guava:()=>"シャッキ・クヴァルグァバー",kvaris_persimmon_notable:()=>"ノータ・クヴァルガッキー",kvaris_octopus:()=>"サッパ・クヴァルオクトヴァ",kvaris_snail:()=>"マッタ・クヴァルマギカイ",kvaris_squid_notable:()=>"ノータ・クヴァルスクイド",kvaris_squid:()=>"シャッキ・クヴァルスクイド"},missions:{finish_point:()=>"フィニッシュポイントに到達する",finish_goal:()=>"フィニッシュポイントに到達する",defeat:e=>e[1]+"を倒す",defeat_many:e=>"エネミーを"+e[1]+"体倒す",defeat_many_target:e=>e[2]+"を"+e[1]+"体倒す",defeat_all:()=>"全てのエネミーを倒す",all_side:()=>"サイドミッションをすべて達成してクリア",cubes:e=>"ポイントキューブを"+e[1]+"個取得してクリア",time_lt:e=>a(e[1],"ja-JP")+" 未満でクリア",incapacitated_lt:e=>"戦闘不能回数"+e[1]+"回未満でクリア",damage_lt:e=>"ダメージ回数"+e[1]+"回未満でクリア",heal_lt:e=>"レスタサインの使用回数"+e[1]+"回未満でクリア",inflict_gte:e=>e[1]+"以上のダメージを"+e[2]+"回以上与えてクリア",fallen_lt:e=>"落下回数"+e[1]+"未満でクリア",glide_lt:e=>"グライドの使用"+e[1]+"回未満でクリア",drome_gte:e=>"ドロームの追従レベルがLv."+e[1]+"の状態を維持してクリア",suppressed_lt:e=>"エネミー討伐数"+e[1]+"体未満でクリア"},failures:{time:e=>a(e[1],"ja-JP")+"以上経過する",incapacitated:e=>e[1]+"回戦闘不能になる",fall:e=>e[1]+"回落下する"},rewards:{exp:()=>"EXP",meseta:()=>"N-メセタ",seasonal:()=>"Seasonal Point",skill:()=>"スキルポイント"},items:{armor_behlgren:()=>"Behlgren Armor",armor_geant:()=>"Geant Armor",armor_greas:()=>"Greas Armor",armor_primm_gold:()=>"Gold Primm Armor",armor_primm_silver:()=>"Silver Primm Armor",armor_qual_arga:()=>"Qual de Armor: Arga",armor_qual_belta:()=>"Qual de Armor: Belta",armor_qual_sheza:()=>"Qual de Armor: Sheza",armor_sestato_arga:()=>"Sestato Armor: Arga",armor_sestato_belta:()=>"Sestato Armor: Belta",armor_sestato_sheza:()=>"Sestato Armor: Sheza",armor_vidalun:()=>"Vidalun Armor",armor_vijf_arga:()=>"Vijf Armor: Arga",armor_vijf_belta:()=>"Vijf Armor: Belta",armor_vijf_sheza:()=>"Vijf Armor: Sheza",armor_viosel:()=>"Viosel Armor",arms_refiner:()=>"Arms Refiner",augment_ael_domina:()=>"C/Ael Domina",augment_ams_soul:()=>"C/アムス・ソール",augment_crocys_soul:()=>"C/クロコス・ソール",augment_decold_standard:()=>"C/Decold Standard",augment_dolz_soul:()=>"C/Dolz Soul",augment_dustyl_soul:()=>"C/スナイド・ソール",augment_gigas_might:()=>"C/Gigas Might",augment_gigas_precision:()=>"C/Gigas Precision",augment_gigas_technique:()=>"C/Gigas Technique",augment_mastery:()=>"C/Mastery",augment_might:()=>"C/パワー",augment_nex_soul:()=>"C/ネクス・ソール",augment_precision:()=>"C/シュート",augment_renus_soul:()=>"C/レヌス・ソール",augment_ragras_soul:()=>"C/ラグラス・ソール",augment_ret_domina:()=>"C/Ret Domina",augment_super_might:()=>"Super Might",augment_super_precision:()=>"Super Precision",augment_super_spimel:()=>"Super Spimel",augment_super_spira:()=>"Super Spira",augment_super_spitech:()=>"Super Spitech",augment_super_stamel:()=>"Super Stamel",augment_super_stara:()=>"Super Stara",augment_super_statech:()=>"Super Statech",augment_super_technique:()=>"Super Technique",augment_technique:()=>"C/テクニック",augment_tria_deftromel:()=>"Tria Deftromel",augment_tria_deftrora:()=>"Tria Deftrora",augment_tria_deftrotech:()=>"Tria Deftrotech",augment_tria_guaromel:()=>"Tria Guaromel",augment_tria_guarora:()=>"Tria Guarora",augment_tria_guarotech:()=>"Tria Guarotech",augment_tria_spiora:()=>"Tria Spiora",augment_tria_spiromel:()=>"Tria Spiromel",augment_tria_spirotech:()=>"Tria Spirotech",augment_tria_staromel:()=>"Tria Staromel",augment_tria_starora:()=>"Tria Starora",augment_tria_starotech:()=>"Tria Starotech",augment_vardi_soul:()=>"C/ヴァーディ・ソール",camo_straga_almati:()=>"* Straga Almati",excube_hu:()=>"N-HU-EX-Cube",excube_fi:()=>"N-FI-EX-Cube",excube_ra:()=>"N-RA-EX-Cube",excube_gu:()=>"N-GU-EX-Cube",excube_fo:()=>"N-FO-EX-Cube",excube_te:()=>"N-TE-EX-Cube",excube_br:()=>"N-BR-EX-Cube",excube_bo:()=>"N-BO-EX-Cube",excube_wa:()=>"N-WA-EX-Cube",mtn_dash_fairy_b:()=>"MTN: Dash - Fairy/B",strugment_a:()=>"Strugment A",strugment_b:()=>"Strugment B",strugment_c:()=>"Strugment C",weapon_kuku_boots:()=>"Kukuhroziat Boots",weapon_kuku_bow:()=>"Kukuhroziat Bow",weapon_kuku_daggers:()=>"Kukuhroziat Daggers",weapon_kuku_katana:()=>"Kukuhroziat Katana",weapon_kuku_knuckles:()=>"Kukuhroziat Knuckles",weapon_kuku_launcher:()=>"Kukuhroziat Launcher",weapon_kuku_series:()=>"Kukuhroziat Series Weapon",weapon_kuku_spear:()=>"Kukuhroziat Spear",weapon_kuku_tmg:()=>"Kukuhroziat Machine Gun",weapon_kuku_wand:()=>"Kukuhroziat Wand",weapon_kuku_wire:()=>"Kukuhroziat Wire",weapon_primm_gold:()=>"Gold Primm Sword",weapon_primm_silver:()=>"Silver Primm Sword",weapon_relik_series:()=>"Relik Series Weapon",weapon_rokz_series:()=>"Rokz Series Weapon",weapon_rugged_series:()=>"Rugged Series Weapon",weapon_sechetyl_series:()=>"Sechetyl Series Weapon",weapon_straga_series:()=>"Straga Series Weapon",fashion_items:()=>"Fashion items",photon_scale:()=>"フォトンスケイル",special_scratch_ticket:()=>"Special Scratch Ticket"},enemies:{ams_krone:()=>"アムス・クローネ",bujin:()=>"ブジン",chiacurio:()=>"チアキュリオ",daityl_sword:()=>"ダイダル・ソード",destragras:()=>"デストラグラス",fortos_laser:()=>"フォートス・レーザー",malachroid:()=>"マーカライド",pangolan:()=>"パンゴラン",pettas_sword:()=>"ペダス・ソード"},battledias:{aelio_troopers:{name:()=>"エアリオトルーパーズ"},aelio_devastators:{name:()=>"エアリオデバステーターズ"},retem_troopers:{name:()=>"リテムトルーパーズ"},retem_devastators:{name:()=>"リテムデバステーターズ"},kvaris_troopers:{name:()=>"クヴァリストルーパーズ"},kvaris_devastators:{name:()=>"クヴァリスデバステーターズ"}},cocoons:{first_step:{name:()=>"ファーストステップ",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。指示に従い、新たなアクションを習得しつつ、目標地点に到達せよ。"},enhanced_enemy:{name:()=>"エンハンスドエネミー",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。戦闘技術を駆使して、強化された“ペダス・ソード”を撃破せよ。"},swift_jump:{name:()=>"スウィフトジャンプ",description:()=>"ここは、アークス各人の跳躍能力を試すトレイニアである。“ジャンプ”、“2段ジャンプ”を用いて、目標地点に到達せよ。"},wild_rush:{name:()=>"ワイルドラッシュ",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。"},test_flight:{name:()=>"テストフライト",description:()=>"ここは、アークス各人の飛翔能力を試すトレイニアである。“フォトングライド”を用いて、目標地点に到達せよ。"},roaring_rush:{name:()=>"ローリングラッシュ",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。"},fleeting_fight:{name:()=>"セツナノイッセン",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。戦闘技術を駆使して、“ブジン”を撃破せよ。"},runway:{name:()=>"ローンウェイ",description:()=>"ここは、アークス各人の走破能力を試すトレイニアである。“フォトンダッシュ”を用いて、目標地点に到達せよ。"},vanishing_path:{name:()=>"バニシングウェイ",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。”バニッシュブロック”に注意を払いつつ、全てのエネミーを撃破せよ。"},narrow_cage:{name:()=>"ナローケージ",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。戦闘技術を駆使して、全てのエネミーを撃破せよ。"},buddy_attack:{name:()=>"バディアタック",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。”ドローム”の支援を受けつつ、全てのエネミーを撃破せよ。"},dyna_assault:{name:()=>"ダイナアサルト",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。戦闘技術を駆使して、”リゼントス”を撃破せよ。"},parkour_master:{name:()=>"パルクールマスター",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。”ジャンプ”、”2段ジャンプ”、”ウォールキック”を用いて、目標地点に到達せよ。"},runway_2:{name:()=>"ローンウェイⅡ",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。”フォトンダッシュ”を用いて、目標地点に到達せよ。"},crazy_tail:{name:()=>"クレイジーテイル",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。戦闘技術を駆使して、“パンゴラン”を撃破せよ。"},slope_style:{name:()=>"スロープスタイル",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。“フローティングボード”を用いて、目標地点に到達せよ。"},clockwork_prison:{name:()=>"クロックワークジェイル",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。戦闘技術を駆使して、全てのエネミーを撃破せよ。"},horrible_flapping:{name:()=>"ホリブルフラッピング",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。戦闘技術を駆使して、“マーカライド”を撃破せよ。"},wild_avalanche:{name:()=>"ワイルドアバランチ",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。戦闘技術を駆使して、“アイスバンサー”、“アイスバンシー”を撃破せよ。"},vanishing_path_2:{name:()=>"バニシングウェイⅡ",description:()=>"ここは、アークス各人の基本能力を試すトレイニアである。“フォトンダッシュ”を用いて、目標地点に到達せよ。"}},towers:{alters_rush:{name:()=>"アルターズラッシュ",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。可能な限りエネミーとの戦闘を避け、戦闘技術を駆使して、最深部で待ち受ける“チアキュリオ”を撃破せよ。"},great_wall:{name:()=>"グレートウォール",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。戦闘技術を駆使し、最深部で待ち受ける“ダイダル・ソード”を撃破せよ。"},aero_runner:{name:()=>"エアロランナー",description:()=>"ここは、アークス各人の飛翔能力を試すトレイニアである。“フォトングライド”を用いて、目標地点に到達せよ。"},dolls_burrow:{name:()=>"ドールズバロウ",description:()=>"ここは、アークス各人の戦闘力を試すトレイニアである。戦闘技術を駆使し、最深部で待ち受ける”デストラグラス”を撃破せよ。"},deepwell:{name:()=>"ディープウェル",description:()=>"ここは、アークス各人の戦闘能力を試すトレイニアである。戦闘技術を駆使して、“アムス・クローネ”を撃破せよ。"}},urgents:{pettas_vera:{name:()=>"統制型ドールズ討伐戦",description:()=>"北エアリオのアルト・ラニ高原で、強力な時空振動が確認された。過去のデータから、統制型ドールズ”ペダス・ヴェラ”の現出が見込まれる。アークス各員は、当該ポイントに急行し、エネミーを撃破せよ。"},nex_vera:{name:()=>"ネクス・ヴェラ討伐戦",description:()=>"レゾルの森で、強力な時空振動が確認された。過去のデータから、戦域統制型ドールズ”ネクス・ヴェラ”の現出が見込まれる。アークス各員は、当該ポイントに急行し、エネミーを撃破せよ。"},mining_rig_aelio:{name:()=>"資源採掘リグ防衛戦：エアリオ",description:()=>"エアリオ平原で活動中の資源回収部隊より、緊急支援の要請があった。周囲に多数のエネミー反応があり、大規模な攻勢が予想される。アークス各員は、当該ポイントに急行し、資源採掘リグを防衛せよ。"},dark_falz:{name:()=>"ダークファルス迎撃戦",description:()=>"セントラルシティ周辺で、“ダークファルス”の出現予兆が確認された。アークス各員は、当該ポイントに急行し、セントラルキャノンの迎撃準備が完了するまで、エネミーの侵攻を阻止せよ。"},renus_vera:{name:()=>"レヌス・ヴェラ討伐戦",description:()=>"中央リテムの北部で、強力な時空振動が確認された。過去のデータから、戦域統制型ドールズ“レヌス・ヴェラ”の現出が見込まれる。アークス各員は、当該ポイントに急行し、エネミーを撃破せよ。"},dustyl_vera:{name:()=>"スナイダル・ヴェラ討伐戦",description:()=>"北リテムのモラーバ峡谷で、強力な時空振動が確認された。過去のデータから、統制型ドールズ“スナイダル・ヴェラ”の現出が見込まれる。アークス各員は、当該ポイントに急行し、エネミーを撃破せよ。"},mining_rig_retem:{name:()=>"資源採掘リグ防衛戦：リテム",description:()=>"アルディマンド砂漠で活動中の資源回収部隊より、緊急支援要請があった。周囲に多数のエネミー反応があり、大規模な攻勢が予測される。アークス各員は、該当ポイントに急行し、資源採掘リグを防衛せよ。"},crocodylis_vera:{name:()=>"クロコダラス・ヴェラ討伐戦",description:()=>"ダナン雪原の北部で、強力な時空振動が確認された。過去のデータから、戦域統制型ドールズ”クロコダラス・ヴェラ”の現出が見込まれる。アークス各員は、該当ポイントに急行し、エネミーを撃破せよ。"},ams_vera:{name:()=>"アムス・ヴェラ討伐戦",description:()=>"ラトヴァ山で強力な時空振動が確認された。過去のデータから、戦域統制型ドールズ“アムス・ヴェラ”の現出が見込まれる。アークス各員は、該当ポイントに急行し、エネミーを撃破せよ。"},mining_rig_kvaris:{name:()=>"資源採掘リグ防衛戦：クヴァリス",description:()=>"ダナン雪原で活動中の資源回収部隊より、緊急支援の要請があった。周囲に多数のエネミー反応があり、大規模な攻勢が予測される。アークス各員は、該当ポイントに急行し、資源採掘リグを防衛せよ。"}},trinitas:{geometric_labyrinth:{name:()=>"ジオメトリックラビリンス",description:()=>`ここは、アークス各人の総合力を試す高等訓練システム“トリニテス”である。持ちうる能力をすべて活用して、最深部を目指せ。
※出現エネミーのレベルはプレイヤーのレベルにより変動`},cannonball_rumble:{name:()=>"キャノンボールランブル",description:()=>"ここは、アークス各人の総合力を試す高等訓練システム“トレイニアアドバンス”である。持ちうる能力をすべて活用して、エネミーを撃破し、ターゲットを破壊せよ。"},cannonball_strike:{name:()=>"キャノンボールストライク",description:()=>"ここは、アークス各人の総合力を試す高等訓練システム“トレイニアアドバンス”である。持ちうる能力をすべて駆使して、エネミーを撃破し、ターゲットを破壊せよ。"}}};export{t as default};
//# sourceMappingURL=ja-JP.js.map
