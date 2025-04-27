const categories = async () => {
  const response = await fetch("https://easihub.com/site.json");
  // Check if the response is successful
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse the JSON response
  const result = await response.json();
  console.log("Response from server:", result);
  return result;
};
let categoriesList = [];
//api.onPageChange(async () => {
(async () => {
  if (categoriesList.length === 0) {
    // Fetch categories only once
    categoriesList = (await categories()).categories;
  }

  const responseApi = async (data) => {
    try {
      const response = await fetch(
        "https://erp-db-glqn.onrender.com/api/erp-collections",
        {
          method: "POST", // HTTP method
          headers: {
            "Content-Type": "application/json", // Specify the content type
          },
          body: JSON.stringify(data), // Convert the data object to a JSON string
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();
      console.log("Response from server:", result);
      return result;
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  const getThumbNail = (original, defaultUrl) => {
    if (
      original?.includes(".png") ||
      original?.includes(".jpg") ||
      original?.includes(".jpeg")
    ) {
      return original;
    } else {
      return defaultUrl;
    }
  };
  const templateEvent = ({
    event_name = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
    event_start_date = "2023-10-01",
    event_end_date = "2023-10-01",
    event_description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
    event_page_url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
    event_thumbnail_url = "https://media.istockphoto.com/id/2155769551/photo/digital-data-tunnel-information-flow.webp?a=1&b=1&s=612x612&w=0&k=20&c=8bWxC25FEzCfubmAtzmswN6bRMj8ETTqULWwLao6B3c=",
  }) => `
<tr data-category-id="69" data-notification-level="regular" class="has-description            
          has-logo">
<td class="category" style="--category-badge-color: #231f20">
    <h3 id="ember1277" class="ember-view">
      <a target="_blank" class="category-title-link" href="${event_page_url}">
        <div class="category-text-title">
          <span class="category-name"
            ><span
              ><span
                class="badge-category__wrapper"
                style="
                  --category-badge-color: #231f20;
                  --category-badge-text-color: #ffffff;
                "
                ><span
                  data-category-id="31"
                  data-drop-close="true"
                  class="badge-category --style-square"
                  title="${event_description}"
                  ><span class="badge-category__name">${event_name}</span></span
                ></span
              ></span
            ></span
          >
        </div>

        <div class="category-logo aspect-image">
          <img
            src="${getThumbNail(
              event_thumbnail_url,
              "https://media.istockphoto.com/id/2155769551/photo/digital-data-tunnel-information-flow.webp?a=1&b=1&s=612x612&w=0&k=20&c=8bWxC25FEzCfubmAtzmswN6bRMj8ETTqULWwLao6B3c="
            )}"
            width="256"
            height="256"
            
            alt=""
          />
        </div>

        </a
      >
    </h3>

    <div class="category-description">
      <span
        >${event_description}</span
      >
    </div>
    <div class="category-date">
      <strong>
      <span>
        Start Date:${event_start_date}</span>
      </strong>

      </div>
    <div class="category-date">
      <strong>
      <span>End Date:${event_end_date}</span>
      </strong>

    </div>
    <button id="social">Social button</button>
  </td>
  </tr>
`;
  const templateBulletin = ({
    version_name = "version 1",
    release_date = "2023-10-01",
    release_notes = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
    url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
    thumbnail_url = "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
  }) => `
<tr data-category-id="69" data-notification-level="regular" class="has-description
          
          has-logo">
<td class="category" style="--category-badge-color: #231f20">
    <h3 id="ember1277" class="ember-view">
      <a target="_blank" class="category-title-link" href="${url}">
        <div class="category-text-title">
          <span class="category-name"
            ><span
              ><span
                class="badge-category__wrapper"
                style="
                  --category-badge-color: #231f20;
                  --category-badge-text-color: #ffffff;
                "
                ><span
                  data-category-id="31"
                  data-drop-close="true"
                  class="badge-category --style-square"
                  title="${description}"
                  ><span class="badge-category__name">${version_name}</span></span
                ></span
              ></span
            ></span
          >
        </div>
        <div class="category-text-title">
          <span class="category-name"
            ><span
              ><span
                class="badge-category__wrapper"
                style="
                  --category-badge-color: #231f20;
                  --category-badge-text-color: #ffffff;
                "
                ><span
                  data-category-id="31"
                  data-drop-close="true"
                  class="badge-category --style-square"
                  title="${release_notes}"
                  ></span
                ></span
              ></span
            ></span
          >
        </div>

        <div class="category-logo aspect-image">
          <img
           src="${getThumbNail(
             thumbnail_url,
             "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"
           )}"              
            width="256"
            height="256"
            
            alt=""
          />
        </div>

        </a
      >
    </h3>

    <div class="category-description">
      <span
        >${description}</span
      >
    </div>      
    <div class="category-description">
      <span
        >Release Date: ${release_date}</span
      >
    </div>      
  </td></tr>
`;
  const templateArticle = ({
    article_title = "Article Title",
    article_description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure autem reiciendis tenetur. Eaque placeat adipisci officiis facere commodi non corporis veniam repellat nesciunt, quasi neque dolore labore voluptatibus laborum.",
    article_author = "John Doe",
    article_date = "2023-10-01",
    article_url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
    article_thumbnail_url = "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
  }) => `
<tr data-category-id="69" data-notification-level="regular" class="has-description
          
          has-logo">
<td class="category" style="--category-badge-color: #231f20">
    <h3 id="ember1277" class="ember-view">
      <a target="_blank" class="category-title-link" href="${article_url}">
        <div class="category-text-title">
          <span class="category-name"
            ><span
              ><span
                class="badge-category__wrapper"
                style="
                  --category-badge-color: #231f20;
                  --category-badge-text-color: #ffffff;
                "
                ><span
                  data-category-id="31"
                  data-drop-close="true"
                  class="badge-category --style-square"
                  title="${article_description}"
                  ><span class="badge-category__name">${article_title}</span></span
                ></span
              ></span
            ></span
          >
        </div>

        <div class="category-logo aspect-image">
          <img
          src="${getThumbNail(
            article_thumbnail_url,
            "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"
          )}"
            src="${article_thumbnail_url}"
            width="256"
            height="256"
            
            alt=""
          />
        </div>

        </a
      >
    </h3>

    <div class="category-description">
      <span
        >${article_description} - ${article_date}</span
      >
     
    </div>   
     <div class="category-description"> <em>Author: ${article_author}</em></div>   
  </td></tr>
`;
  const resultHtml = (tds) => `
<div id="list-area">
      <div class="contents">
      <div class="ember-view">
<table class="category-list ">
  <thead>
      <tr>
          <th class="category"><span role="heading" aria-level="2" id="categories-only-category">Hub</span></th>
          <th class="topics">Topics</th>
          </tr>
      </thead>
<tbody id="custom-tbody" aria-labelledby="categories-only-category">

  ${tds}
  
</tbody>
</table>
</div></div></div>
`;
  const getSubCategory = () => {
    const pathArr =
      //window.location.pathname.split(
      `https://easihub.com/tags/c/plm-product-lifecycle-management/5/events`.split(
        "/"
      );
    //window.location.path
    return {
      subcategoryid: +pathArr[pathArr.length - 2],
      topic_type: pathArr[pathArr.length - 1],
      software_name: "",
    };
  };
  const getCategoryName = async ({
    subcategoryid,
    topic_type,
    software_name,
  }) => {
    let domain_name;

    const subcat = categoriesList.find((x) => x.id == subcategoryid);
    domain_name = subcat?.name;
    if (subcat) {
      if (subcat.parent_category_id) {
        return await getCategoryName({
          subcategoryid: +subcat.parent_category_id,
          topic_type,
          software_name: domain_name,
        });
      }
      // catName = categories.find((x) => x.id == subcat.parent_category_id)?.name;
      return {
        domain_name,
        software_name,
        topic_type,
      };
    } else {
      return "";
    }
  };

  // try {
  //   document.body.addEventListener("click", function (event) {
  //     if (event.target.id == "social") {
  //       const dialog = document.querySelector("dialog");
  //       const handleOutsideClick = (e) => {
  //         const dialogDimensions = dialog.getBoundingClientRect();
  //         if (
  //           e.clientX < dialogDimensions.left ||
  //           e.clientX > dialogDimensions.right ||
  //           e.clientY < dialogDimensions.top ||
  //           e.clientY > dialogDimensions.bottom
  //         ) {
  //           dialog.close();
  //         }
  //       };
  //       const closeButton = document.querySelector("dialog button");
  //       dialog.addEventListener("click", handleOutsideClick);
  //       // "Close" button closes the dialog
  //       closeButton.addEventListener("click", () => {
  //         dialog.close();
  //       });
  //       dialog.showModal();
  //     }
  //   });

  //   if (document.querySelector("li[title='Articles']")) {
  //     const elements = document.querySelectorAll(
  //       ".container.list-container div.row"
  //     );
  //     if (elements.length) {
  //       elements[elements.length - 1].innerHTML = "";
  //     }
  //   }
  const urlParams = getSubCategory();
  const results = await getCategoryName(urlParams);
  if (results.software_name.includes("Generic")) {
    results.software_name = results.domain_name;
  }

  const filtered = await responseApi(results);
  console.log("filtered", filtered);

  //   let resultTds = ``;

  //   if (filtered?.length) {
  //     filtered.forEach((x) => {
  //       if (x.event_name) {
  //         resultTds += templateEvent(x);
  //       }
  //       if (x.version_name) {
  //         resultTds += templateBulletin(x);
  //       }
  //       if (x.article_title) {
  //         resultTds += templateArticle(x);
  //       }
  //     });
  //     const resultsToDisplay = resultHtml(resultTds);
  //     console.log(resultsToDisplay);
  //     //setTimeout(() => {

  //     // alert(document.querySelector("li[title='Articles']"));
  //     // if (document.querySelector("li[title='Articles']")) {
  //     //   const html = resultsToDisplay;

  //     //   const elements = document.querySelectorAll(
  //     //     ".container.list-container div.row"
  //     //   );
  //     //   if (elements.length) {
  //     //     elements[elements.length - 1].innerHTML = html;
  //     //   }
  //     // }
  //     //}, 10);
  //   }

  //   console.log("");
  // } catch (error) {
  //   console.log("error", error);
  // }
})();
//});
