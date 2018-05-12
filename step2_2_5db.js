var db_RAM=[ // 삼성 DDR4
  {name:"ㅁㄴㅇㄹ", price:93900, link:"http://prod.danawa.com/info/?pcode=4343051"},
  {name:"ㅁㄴㅇㄹ", price:185500, link:"http://prod.danawa.com/info/?pcode=4519874"}];

var db_SSD=[ //
  {name:"ㅁㄴㅇㄹ", price:89500, link:"http://prod.danawa.com/info/?pcode=5781886"},
  {name:"ㅁㄴㅇㄹ", price:153500, link:"http://prod.danawa.com/info/?pcode=5781894"}
]

var db_HDD=[
  {name:"ㅁㄴㅇㄹ", price:0, link:"NULL"},
  {name:"ㅁㄴㅇㄹ", price:47150, link:"http://prod.danawa.com/info/?pcode=1706996"}
]

var db_GPU=[
    {name:"ZOTAC GTX1050Ti DUALSILENCER OC 4GB", price:233770, link:"http://prod.danawa.com/info/?pcode=4586507"},
    {name:"리드텍 WinFast 지포스 GTX1060 HURRICANE OC D5 3GB", price:302790, link:"http://prod.danawa.com/info/?pcode=5540416"},
    {name:"GIGABYTE 지포스 GTX1060 G1.Gaming D5 3GB", price:350700, link:"http://prod.danawa.com/info/?pcode=4360032"},
    {name:"리드텍 WinFast 지포스 GTX1060 HURRICANE OC D5 6GB", price:398790, link:"http://prod.danawa.com/info/?pcode=5540425"},
    {name:"ZOTAC AMP 지포스 GTX1060 D5 6GB 백플레이트", price:411280, link:"http://prod.danawa.com/info/?pcode=4796979"},
    {name:"MSI 지포스 GTX1060 게이밍 X D5 6GB 트윈프로져6", price:449400, link:"http://prod.danawa.com/info/?pcode=4260047"},
    {name:"ASUS ROG STRIX 지포스 GTX1060 O6G GAMING D5 6GB", price:465150, link:"http://prod.danawa.com/info/?pcode=5078717"},
    {name:"SAPPHIRE 라데온 RX 580 NITRO+ OC D5 8GB Dual-X", price:487000, link:"http://prod.danawa.com/info/?pcode=5089139"}
]


var db_CPU=[
  {name:"인텔 펜티엄 G4600", price:68100, link:"http://prod.danawa.com/info/?pcode=4827968"},
    {name:"AMD 라이젠 3 2200G", price:106790, link:"http://prod.danawa.com/info/?pcode=5884539"},
    {name:"인텔 코어i3-8세대 8100", price:128260, link:"http://prod.danawa.com/info/?pcode=5530456"},
    {name:"AMD 라이젠 5 2400G", price:181790, link:"http://prod.danawa.com/info/?pcode=5884096"},
    {name:"인텔 코어i5-8세대 8500", price:225780, link:"http://prod.danawa.com/info/?pcode=6020667"},
    {name:"AMD 라이젠 5 2600", price:245000, link:"http://prod.danawa.com/info/?pcode=6066396"},
    {name:"인텔 코어i5-8세대 8600", price:251150, link:"http://prod.danawa.com/info/?pcode=6020678"},
    {name:"AMD 라이젠 5 2600X", price:284000, link:"http://prod.danawa.com/info/?pcode=6066419"}
]

var db_CASE=[ // 파워값 포함되어 있음
  {name:"GT303 FS  블랙 ARGB", price:92000, link:"http://prod.danawa.com/info/?pcode=6006452&cate=113971", popular:5, fullname:"DAVEN GT303 FS  블랙 ARGB", color:true, side:"유리", index:0},
  {name:"A5 셀레네 2면 블랙", price:91000, link:"http://prod.danawa.com/info/?pcode=5864296&cate=113971", popular:5, fullname:"COX A5 셀레네 2면 블랙", color:true, side:"유리", index:1},
  {name:"Frontier H300 화이트", price:69400, link:"http://prod.danawa.com/info/?pcode=4017657&cate=113971", popular:5, fullname:"마이크로닉스 Frontier H300 화이트", color:false, side:"아크릴", index:2},
  {name:"M3 화이트 LED & 강화유리", price:79000, link:"http://prod.danawa.com/info/?pcode=5452363&cate=113971", popular:5, fullname:"아이구주 M3 화이트 LED & 강화유리", color:true, side:"아크릴", index:3},
  {name:"MASTERBOX LITE 5 RGB", price:115000, link:"http://prod.danawa.com/info/?pcode=5619187&cate=113971", popular:5, fullname:"쿨러마스터 MASTERBOX LITE 5 RGB", color:true, side:"유리", index:4},
  {name:"ENIX USB 3.0 화이트", price:76000, link:"http://prod.danawa.com/info/?pcode=4204000&cate=113971", popular:5, fullname:"대양케이스 ENIX USB 3.0 화이트", color:true, side:"아크릴", index:5},
  {name:"L530 강화유리", price:106700, link:"http://prod.danawa.com/info/?pcode=4742536&cate=113971", popular:4, fullname:"3RSYS L530 강화유리", color:true, side:"유리", index:6},
  {name:"GT101 블랙 ARGB", price:72600, link:"http://prod.danawa.com/info/?pcode=6041277&cate=113971", popular:4, fullname:"DAVEN GT101 블랙 ARGB", color:true, side:"유리", index:7},
  {name:"J210 해머", price:70900, link:"http://prod.danawa.com/info/?pcode=3969924&cate=113971", popular:4, fullname:"3RSYS J210 해머", color:true, side:"아크릴", index:8},
  {name:"스텔스 EX270 파노라마", price:101200, link:"http://prod.danawa.com/info/?pcode=3471240&cate=113971", popular:4, fullname:"BRAVOTEC 스텔스 EX270 파노라마", color:true, side:"아크릴", index:9},
  {name:"A3 노빌레 with 헤일로 X4", price:91000, link:"http://prod.danawa.com/info/?pcode=5040266&cate=113971", popular:3, fullname:"COX A3 노빌레 with 헤일로 X4", color:true, side:"아크릴", index:10},
  {name:"J400 블랙 강화유리", price:85800, link:"http://prod.danawa.com/info/?pcode=5396739&cate=113971", popular:3, fullname:"3RSYS J400 블랙 강화유리", color:true, side:"유리", index:11},
  {name:"아쿠라 3.0", price:66880, link:"http://prod.danawa.com/info/?pcode=5936429&cate=113971", popular:3, fullname:"DAVEN 아쿠라 3.0", color:true, side:"아크릴", index:12},
  {name:"Frontier H350 화이트", price:75500, link:"http://prod.danawa.com/info/?pcode=5255162&cate=113971", popular:3, fullname:"마이크로닉스 Frontier H350 화이트", color:false, side:"아크릴", index:13},
  {name:"L900 USB3.0", price:116100, link:"http://prod.danawa.com/info/?pcode=3412899&cate=113971", popular:3, fullname:"3RSYS L900 USB3.0", color:true, side:"", index:14},
  {name:"M2 타이푼 RING LED", price:94000, link:"http://prod.danawa.com/info/?pcode=5040523&cate=113971", popular:3, fullname:"아이구주 M2 타이푼 RING LED", color:true, side:"아크릴", index:15},
  {name:"L530 화이트 강화유리", price:111800, link:"http://prod.danawa.com/info/?pcode=4742541&cate=113971", popular:2, fullname:"3RSYS L530 화이트 강화유리", color:false, side:"유리", index:16},
  {name:"CRUZER USB 3.0 윈도우", price:74790, link:"http://prod.danawa.com/info/?pcode=4703178&cate=113971", popular:2, fullname:"대양케이스 CRUZER USB 3.0 윈도우", color:false, side:"아크릴", index:17},
  {name:"RC 170T USB3.0", price:57500, link:"http://prod.danawa.com/info/?pcode=4049794&cate=113971", popular:2, fullname:"COX RC 170T USB3.0", color:true, side:"", index:18},
  {name:"Master M400", price:110000, link:"http://prod.danawa.com/info/?pcode=5810231&cate=113971", popular:2, fullname:"마이크로닉스 Master M400", color:true, side:"유리", index:19}
]



var db_MB=[
  {name:"ECS DURATHON2 H110M4-C2D", price:51660, link:"http://prod.danawa.com/info/?pcode=4387626"},
  {name:"ASRock A320-DGS", price:61220, link:"http://prod.danawa.com/info/?pcode=5055081"},
  {name:"MSI H310M PRO-VD", price:82780, link:"http://prod.danawa.com/info/?pcode=6014541"}
]

var db_PSU=[
  {name:"마이크로닉스 Classic II 500W +12V Single Rail 85+", price:44000, link:"http://prod.danawa.com/info/?pcode=1928673"}

]
