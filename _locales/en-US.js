import{a as n}from"./chunk-VI23SD3N.js";function r(e){return r[e]||(r[e]=new Intl.NumberFormat(e))}function i(e,t,s){return r(e).format(t-s)}function c(e,t,s,o,p){if({}.hasOwnProperty.call(o,e))return o[e];t&&(e-=t);var a=s(e,p);return a in o?o[a]:o.other}var d=e=>{let t=String(e).split("."),s=!t[1];return e==1&&s?"one":"other"};var l=d;var w={ui:{quest_info:{title:()=>"Quest Info",max_players_info:e=>"This quest can be played with up to "+c(e.value,0,l,{one:i("en-US",e.value,0)+" player",other:i("en-US",e.value,0)+" players"}),enemy_level:{title:()=>"Enemy Level",content:e=>"Lv. "+e.level},recommended_power:{title:()=>"Recommended Stats",content:e=>e.power+" Battle Power or above"},main_mission:()=>"Main Mission",side_missions:()=>"Side Missions",fail_conditions:()=>"Fail Conditions",first_clear_rewards:()=>"First Clear Rewards",rewards:()=>"Rewards",rank_select_option:e=>"Rank "+e.rank+" (Enemy Lv. "+e.level+")"},map_legend:{title:()=>"Map Legend",reset_option:()=>"Reset visible markers"},settings:{title:()=>"Settings",language_option:()=>"Language",settings_change_msg:()=>"Some settings has been changed, you need to reload the page for it to take effect.",settings_change_btn:()=>"Reload"},languages:{"en-US":()=>"English","ja-JP":()=>"Japanese"},landmarks:()=>"Landmarks",minerals:()=>"Minerals",vegetables:()=>"Vegetable",fruits:()=>"Fruits",seafoods:()=>"Seafoods"},markers:{battledias:()=>"Battledia",cocoons:()=>"Cocoon",mags:()=>"Region Mag",ryukers:()=>"Ryuker Device",towers:()=>"Tower",trinitas:()=>"Trinitas",urgents:()=>"Urgent Quest",kvaris_guava:()=>"Crisp Kvaris Guava",kvaris_persimmon_notable:()=>"Notable Kvaris Persimmon",kvaris_octopus:()=>"Light Kvaris Octopus",kvaris_snail:()=>"Rich Kvaris Snail",kvaris_squid_notable:()=>"Notable Kvaris Squid",kvaris_squid:()=>"Crisp Kvaris Squid"},missions:{finish_point:()=>"Reach the finish point",finish_goal:()=>"Reach the goal",defeat:e=>"Defeat the "+e[1],defeat_many:e=>"Defeat "+e[1]+" enemies",defeat_many_target:e=>"Defeat "+e[1]+" target enemies ("+e[2]+")",defeat_all:()=>"Defeat all enemies",all_side:()=>"Complete all Side Missions and clear",cubes:e=>"Obtain "+e[1]+" Point Cubes",time_lt:e=>"Clear before "+n(e[1],"en-US"),incapacitated_lt:e=>"Clear without being incapacitated "+e[1]+" times",damage_lt:e=>"Clear having taken damage fewer than "+e[1]+" times",heal_lt:e=>"Clear having used Restasigne fewer than "+e[1]+" times",inflict_gte:e=>"Inflict over "+e[1]+" dmg over "+e[2]+" times",fallen_lt:e=>"Clear without falling "+e[1]+" times",glide_lt:e=>"Clear while having used Glide fewer than "+e[1]+" times",drome_gte:e=>"Maintain your hacked Drome's level to "+e[1]+" to clear",suppressed_lt:e=>"Clear having suppressed under "+e[1]+" of the enemies"},failures:{time:e=>"Time exceeds "+n(e[1],"en-US"),incapacitated:e=>"Incapacitated "+e[1]+" times",fall:e=>"Fall "+e[1]+" times"},rewards:{exp:()=>"EXP",meseta:()=>"N-Meseta",skill:()=>"Skill Point"},items:{armor_primm_gold:()=>"Gold Primm Armor",armor_primm_silver:()=>"Silver Primm Armor",augment_ael_domina:()=>"C/Ael Domina",augment_ams_soul:()=>"C/Ams Soul",augment_crocys_soul:()=>"C/Crocys Soul",augment_decold_standard:()=>"C/Decold Standard",augment_dustyl_soul:()=>"C/Dustyl Soul",augment_mastery:()=>"C/Mastery",augment_nex_soul:()=>"C/Nex Soul",augment_precision:()=>"C/Precision",augment_renus_soul:()=>"C/Renus Soul",augment_ret_domina:()=>"C/Ret Domina",augment_technique:()=>"C/Technique",augment_vardi_soul:()=>"C/Vardi Soul",weapon_primm_gold:()=>"Gold Primm Sword",weapon_primm_silver:()=>"Silver Primm Sword",photon_scale:()=>"Photon Scales"},enemies:{ams_krone:()=>"Ams Krone",bujin:()=>"Bujin",chiacurio:()=>"Chiacurio",daityl_sword:()=>"Daityl Sword",destragras:()=>"Destragras",fortos_laser:()=>"Fortos Laser",malachroid:()=>"Malachroid",pangolan:()=>"Pangolan",pettas_sword:()=>"Pettas Sword"},battledias:{aelio_troopers:{name:()=>"Aelio Troopers",description:()=>"This is a Battledia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat all of the enemies."},aelio_devastators:{name:()=>"Aelio Devastators",description:()=>"This is a Battledia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Gigantix one after the other."},retem_troopers:{name:()=>"Retem Troopers",description:()=>"This is a Battledia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat all of the enemies."},retem_devastators:{name:()=>"Retem Devastators",description:()=>"This is a Battledia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Gigantix one after the other."},kvaris_troopers:{name:()=>"Kvaris Troopers",description:()=>"This is a Battledia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat all of the enemies."},kvaris_devastators:{name:()=>"Kvaris Devastators",description:()=>"This is a Battledia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Gigantix one after the other."}},cocoons:{first_step:{name:()=>"First Step",description:()=>"This is Trainia, where ARKS defenders can test their abilities. Follow the instructions to reach the goal while learning the new action."},enhanced_enemy:{name:()=>"Enhanced Enemy",description:()=>"This is Trainia, where ARKS defenders can test their abilities. Defeat the enhanced Pettas Sword using your battle skills."},swift_jump:{name:()=>"Swift Jump",description:()=>'This is Trainia, where ARKS defenders can test their abilities. Reach the goal using "Jump" and "Double Jump".'},wild_rush:{name:()=>"Wild Rush",description:()=>"This is Trainia, where ARKS defenders can test their abilities. Defeat all enemies using your battle skills."},test_flight:{name:()=>"Test Flight",description:()=>"This is Trainia, where ARKS defenders can test their gliding capabilities. Use Photon Glide to reach the target destination."},roaring_rush:{name:()=>"Roaring Rush",description:()=>"This is Trainia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Gororox."},fleeting_fight:{name:()=>"Fleeting Fight",description:()=>"This is Trainia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Bujin."},runway:{name:()=>"Runway",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Use Photon Dash to reach the target destination."},vanishing_path:{name:()=>"Vanishing Path",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Defeat all the enemies while keeping an eye on Vanishing Blocks."},narrow_cage:{name:()=>"Narrow Cage",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Make use of your battle skills to defeat all of the enemies."},buddy_attack:{name:()=>"Buddy Attack",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Defeat all the enemies with support from Dromes."},dyna_assault:{name:()=>"Dyna Assault",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Make use of your battle skills to defeat the Lizentos."},parkour_master:{name:()=>"Parkour Master",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Reach the goal using Jumps, Double Jumps, and Wall Kicks."},runway_2:{name:()=>"Runway II",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Use Photon Dash to reach the target destination."},crazy_tail:{name:()=>"Crazy Tail",description:()=>"This is Trainia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Pangolan."},slope_style:{name:()=>"Slope Style",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Use floating boards to reach the target destination."},clockwork_prison:{name:()=>"Clockwork Prison",description:()=>"This is Trainia, where ARKS defenders can test their combat capabilities. Make use of your battle skills to defeat all of the enemies."},horrible_flapping:{name:()=>"Horrible Flapping",description:()=>"This is Trainia, where ARKS defenders can test their combat capabilities. Make use of your battle skills to defeat the Malachroid."},wild_avalanche:{name:()=>"Wild Avalanche",description:()=>"This is Trainia, where ARKS defenders can test their combat capabilities. Make use of your battle skills to defeat the Ice Banser."},vanishing_path_2:{name:()=>"Vanishing Path II",description:()=>"This is Trainia, where ARKS defenders can test their dashing capabilities. Use Photon Dash to reach the target destination."}},towers:{alters_rush:{name:()=>"ALTERS Rush",description:()=>"This is Trainia, where ARKS defenders can test their combat abilities. Avoid combat with enemies whenever possible and make use of your battle skills to defeat the Chiacurio in the final area."},great_wall:{name:()=>"Great Wall",description:()=>"This is Trainia, where ARKS defenders can test their abilities. Defeat the Daityl Sword in the final area using your battle skills."},aero_runner:{name:()=>"Aero Runner",description:()=>"This is Trainia, where ARKS defenders can test their gliding capabilities. Use Photon Glide to reach the target destination."},dolls_burrow:{name:()=>"DOLLS Burrow",description:()=>"This is Trainia, where ARKS defenders can test their combat abilities. Defeat the Destragras in the final area using your battle skills."},deepwell:{name:()=>"Deepwell",description:()=>"This is Trainia, where ARKS defenders can test their combat abilities. Make use of your battle skills to defeat the Ams Krone in the final area."}},urgents:{pettas_vera:{name:()=>"Command DOLLS Suppresion Op",description:()=>"A powerful space-time flux has been detected in the Altolani Plateau in North Aelio. Based on past data, we expect Pettas Veras, the Command DOLLS unit, to be there. We need all ARKS defenders to hurry to the designated point and defeat the enemy."},nex_vera:{name:()=>"Nex Vera Suppression Op",description:()=>"A powerful space-time flux has been detected in Resol Forest. Based on past data, we expect Nex Vera, the Command DOLLS unit, to be in the combat zone. We need all ARKS defenders to hurry to the designated point and defeat the enemy."},mining_rig_aelio:{name:()=>"Mining Rig Defense: Aelio",description:()=>"We've received an emergency support request from our active mining unit in Aelio Plains. Numerous enemy readings in the area suggest a major assault is likely. We need all ARKS defenders to hurry to the site and defend the Mining Rig."},dark_falz:{name:()=>"Dark Falz Interception",description:()=>"Our data points to the imminent appearance of Dark Falz in the Central City area. All ARKS defenders report to the rerdezvous immediately and repel the enemy advance until the Central Cannon is operational."},renus_vera:{name:()=>"Renus Vera Suppression Op",description:()=>"A powerful space-time flux has been detected in the northern part of Central Retem. Based on past data, we expect Renus Vera, the Command DOLLS unit, to be there. We need all ARKS defenders to hurry to the designated point and defeat the enemy."},dustyl_vera:{name:()=>"Dustyl Vera Suppression Op",description:()=>"A powerful space-time flux has been detected in Murabba Canyon in North Retem. Based on past data, we expect Dustyl Vera, the Command DOLLS unit, to be there. We need all ARKS defenders to hurry to the designated point and defeat the enemy."},mining_rig_retem:{name:()=>"Mining Rig Defense: Retem",description:()=>"We've received an emergency support request from our active mining unit in Aldimond Desert. Numerous enemy readings in the area suggest a major assault is likely. We need all ARKS defenders to hurry to the site and defend the Mining Rig."},crocodylis_vera:{name:()=>"Crocodylis Vera Suppression Op",description:()=>"A powerful space-time flux has been detected in the northern part of Danann Snow Field. Based on past data, we expect Crocodylis Vera, the Command DOLLS unit, to be in the combat zone. We need all ARKS defenders to hurry to the designated point and defeat the enemy."},ams_vera:{name:()=>"Ams Vera Suppression Op",description:()=>"A powerful space-time flux has been detected on Mt. Latva. Based on past data, we expect Ams Vera, the Command DOLLS unit, to be in the combat zone. We need all ARKS defenders to hurry to the designated point and defeat the enemy."},mining_rig_kvaris:{name:()=>"Mining Rig Defense: Kvaris",description:()=>"We've received an emergency support request from our active mining unit on Danann Snow Field. Numerous enemy readings in the area suggests a major assault is likely. We need all ARKS defenders to hurry to the site and defend the mining rigs."}},trinitas:{geometric_labyrinth:{name:()=>"Geometric Labyrinth",description:()=>"This is Trinitas, an advanced training system meant to test an ARKS defender's overall level of skill. Use every ability available to you to reach the final area. Enemies' levels will change depending on the player's level."},cannonball_rumble:{name:()=>"Cannonball Rumble",description:()=>"This is Trainia Advance, an advanced training system meant to test an ARKS defender's overall level of skill. Use every ability available to you to defeat the enemies and destroy the targets."},cannonball_strike:{name:()=>"Cannonball Strike",description:()=>"This is Trainia Advance, an advanced training system meant to test an ARKS defender's overall level of skill. Use every ability available to you to defeat the enemies and destroy the targets."}}};export{w as default};
//# sourceMappingURL=en-US.js.map
