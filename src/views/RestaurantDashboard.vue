<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">{{ restaurant.categoryName }}</span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">回上一頁</button>
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 2272,
    name: "Alphacamp",
    tel: "+886225469766",
    address: "10596台北市松山區復興北路201號 6號樓之4",
    opening_hours: "10:00",
    description:
      "ALPHA Camp 的使命是「幫助人們發展有意義、有價值的職涯」。自 2014 年以來，我們以新加坡和台灣為教學據點，培訓超過 5000 名學員。校友遍及台灣、新加坡、中國、以及全球的科技新創。",
    image: "https://i.imgur.com/0eoS1OB.png",
    viewCounts: 42,
    createdAt: "2020-08-30T08:20:57.000Z",
    updatedAt: "2020-09-14T02:18:20.000Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理mmmm",
      createdAt: "2020-02-28T14:38:32.000Z",
      updatedAt: "2020-09-03T08:19:17.000Z",
    },
    Comments: [
      {
        id: 5162,
        text:
          "強大的教練團隊真的是AC的主軸命脈！\n\n首先，週進度制的學習規範很獨特而有效。自由安排學習進度，但是當週有必繳交的作業與需要完讀的概念。而在完成每項作業練習後又能參考別人的編碼過程，也能詢問或鼓勵其他學員，助教與學員們的往來答問都是全部公開給大家觀摩學習的。再來則是課中輔導的線上工作坊，所有疑難雜症都能詢問助教，並利用一些活動加深複習所學，為時不長平均約一個半小時左右但效果極佳，我很喜歡這個學習安排與互動，總是收穫良多！\n\n光是製作精美完善的學習內容還不夠，助教們的陪伴指導與批改建議讓學員們絕對不會徬徨無",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:21:41.000Z",
        updatedAt: "2020-08-30T08:21:41.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5172,
        text:
          "很有理念和熱誠培育科技人才的學校，社群氣氛十分活潑，辦的活動乾貨滿滿，請來的業界大大講者們都很誠懇願意分享給學生和年輕人建議",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:21:54.000Z",
        updatedAt: "2020-08-30T08:21:54.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5182,
        text:
          "在職場上需要有持續學習的目標，因本身的業務與網頁開發有密切的關係，在眾多學習平台的比較之後，決定加入 ALPHA Camp的大家庭。\n在#alphacamp 的 #Lighthouse平台有許多很棒的支持與體驗。\n\n1. 有結構式的課程，以文字輔以影片解析。\n2. 課程搭配實作，逐步深化學習範圍。\n3.許多專業又有熱情助教評改作業，可以透過發問尋求幫助。\n4.透過 #Lighthouse平台觀摩同學間設計（以當下程度與角度學習，可以避免過大的挫折感）；又可以促進自己腦力激盪，非常有幫助。\n5.同學相互友善",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:04.000Z",
        updatedAt: "2020-08-30T08:22:04.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5192,
        text:
          "我是從大學三年級開始在AC上學習，過關斬將來到了學期三(以前叫做學期四)，我真的很感謝AC能教會我許多軟技能，以及透過AC社群得到需多新知，雖然目前還沒有求職需求(目前進入研究所階段，需要花費兩年時間)，但我覺得能提早了解業界開發標準以及累積個人軟體實力是很重要的，很開心當初有加入AC這個大家庭!!",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:13.000Z",
        updatedAt: "2020-08-30T08:22:13.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5202,
        text:
          "以往都是依賴文科思維行事的我，為了學習新技能，踏出舒適圈，探索更多職涯的可能性。從0開始學程式、作業寫不出來開始會爬技術文件或觀摩同學作品、硬著頭皮向助教提問、在職學習等等，都是在嘗試之前，不知道原來我做得到的事。謝謝AC團隊的所有成員合力為學生這麼棒的學習體驗！",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:26.000Z",
        updatedAt: "2020-08-30T08:22:26.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5212,
        text:
          "第一次參加工作坊，覺得AC不論在課程內容或工作坊的規劃都蠻用心的，會透過很多工具來輔助學習，對同學的提問也很認真回答。整體規劃上有兼顧到實體和線上課程的長處。",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:31.000Z",
        updatedAt: "2020-08-30T08:22:31.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5222,
        text:
          "對於嘗試學習新的事物已感覺有持續的在進步中，也非常感謝助教們批改作業後細心指導並提供更好的改良方式，希望能持續努力、進步。",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:37.000Z",
        updatedAt: "2020-08-30T08:22:37.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5232,
        text:
          "介面很容易操作，提供大量作業練習、實作，助教也都很溫暖，盡可能提供協助跟鼓勵，很推薦大家用AC開啟自學程式之路~",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:42.000Z",
        updatedAt: "2020-08-30T08:22:42.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5242,
        text:
          "很充分的助教回饋，跟作業講解影片，覺得在實際解題時，一步一步跟著想，收穫很多",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:47.000Z",
        updatedAt: "2020-08-30T08:22:47.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5252,
        text:
          "感謝AC提供的平台與內容，學得很充實也很愉快，既不會太難打擊到學員幼小的心靈，又帶有足夠的挑戰性讓我們可以繼續前進，也謝謝助教們的批改與問題回覆，有的時候觀看其他學員與助教間的對話又可以學習到新的東西，也是很棒的知識來源呢。",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:52.000Z",
        updatedAt: "2020-08-30T08:22:52.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5262,
        text:
          "對於學習前端知識，網路上的資源相當的多。但 AC 的教材整理能建立新手對於整個龐大知識體系的全局觀，進而省下不少摸索統整的時間。對於忙碌中還要撥空學習的上班族而言，我想就是最大的幫助。",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:22:57.000Z",
        updatedAt: "2020-08-30T08:22:57.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
      {
        id: 5272,
        text:
          "在AC上了第一個學期的課程，是我第一次的程式課也是第一個完整上完的線上課程，因為有班級制和有繳交時限的作業等，讓我可以一步步依進度完成課程，助教和工作人員們會對每份作業即時修改和用心回饋，是非常好的學習經驗！",
        UserId: 652,
        RestaurantId: 2272,
        createdAt: "2020-08-30T08:23:01.000Z",
        updatedAt: "2020-08-30T08:23:01.000Z",
        User: {
          id: 652,
          name: "test123",
          email: "test@example.com",
          password:
            "$2a$10$uU6.MzP6v.aGO/JSE.znQuQKKKbqIahmL9lSJr2mBjdSxqeFhKPge",
          isAdmin: true,
          image: "https://i.imgur.com/NS6uGLW.jpeg",
          createdAt: "2020-08-11T13:06:43.000Z",
          updatedAt: "2020-08-29T11:24:22.000Z",
        },
      },
    ],
  },
};

export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: "",
        viewCounts: "",
      },
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchShowData(restaurantId);
  },
  methods: {
    fetchShowData(restaurantId) {
      console.log(restaurantId);
      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category.name,
        commentsLength: dummyData.restaurant.Comments.length,
        viewCounts: dummyData.restaurant.viewCounts,
      };
    },
  },
};
</script>