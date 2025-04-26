const responseApi = async (data) => {
  // Function to make a POST request to the API

  try {
    const response = await fetch("http://localhost:3000/api/erp-collections", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    });

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
const getDefaultUrl = (thumbnail_url, default_thumbnail_url) => {
  if (
    thumbnail_url.includes(".png") ||
    thumbnail_url.includes(".jpg") ||
    thumbnail_url.includes(".jpeg")
  ) {
    return thumbnail_url;
  } else {
    return default_thumbnail_url;
  }
};
const templateEvent = ({
  event_name = "New Event",
  event_start_date = "2023-10-01",
  event_end_date = "2023-10-02",
  event_description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
  event_page_url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
  event_thumbnail_url = "https://media.istockphoto.com/id/2155769551/photo/digital-data-tunnel-information-flow.webp?a=1&b=1&s=612x612&w=0&k=20&c=8bWxC25FEzCfubmAtzmswN6bRMj8ETTqULWwLao6B3c=",
}) => `
<tr data-category-id="69" data-notification-level="regular" class="has-description
            
            has-logo">
  <td class="category" style="--category-badge-color: #231f20">
      <h3 id="ember1277" class="ember-view">
        <a class="category-title-link" href="${event_page_url}">
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
              src="${getDefaultUrl(
                event_thumbnail_url,
                "https://media.istockphoto.com/id/2155769551/photo/digital-data-tunnel-information-flow.webp?a=1&b=1&s=612x612&w=0&k=20&c=8bWxC25FEzCfubmAtzmswN6bRMj8ETTqULWwLao6B3c="
              )}"
              width="256"
              height="256"
              style="--aspect-ratio: 1"
              alt=""
            />
          </div>

          <button class="explore-post-btn">Explore &amp; Post</button></a
        >
      </h3>

      <div class="category-description">
        <span
          >${event_description}</span
        >
      </div>
      <div class="category-date">
        <span
          >${event_start_date}</span
        >
        <span
          >${event_end_date}</span
        >
      </div>
    </td>
    </tr>
  `;
const templateBulletin = ({
  version_name = "New Version",
  release_date = "2023-10-01",
  release_notes = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
  url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
  thumbnail_url = "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
}) => `
<tr data-category-id="69" data-notification-level="regular" class="has-description
            
            has-logo">
  <td class="category" style="--category-badge-color: #231f20">
      <h3 id="ember1277" class="ember-view">
        <a class="category-title-link" href="${url}">
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

          <div class="category-logo aspect-image">
            <img
             src="${getDefaultUrl(
               thumbnail_url,
               "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww"
             )}"                
              width="256"
              height="256"
              style="--aspect-ratio: 1"
              alt=""
            />
          </div>

          <button class="explore-post-btn">Explore &amp; Post</button></a
        >
      </h3>

      <div class="category-description">
        <span
          >${description} - ${release_date}</span
        >
      </div>      
      <div class="category-description">
        <span
          >${release_notes}</span
        >
      </div>      
    </td></tr>
  `;
const templateArticle = ({
  article_title = "The new Article",
  article_description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
  article_author = "John Doe",
  article_date = "2023-10-01",
  article_url = "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
  article_thumbnail_url = "https://media.istockphoto.com/id/2174551157/photo/cyber-security-data-protection-business-technology-privacy-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=wUI3KXIgMqgob_LcEkVhnTl20f0VK-fiJLqBLywYBIU=",
}) => `
<tr data-category-id="69" data-notification-level="regular" class="has-description
            
            has-logo">
  <td class="category" style="--category-badge-color: #231f20">
      <h3 id="ember1277" class="ember-view">
        <a class="category-title-link" href="${article_url}">
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
            src="${getDefaultUrl(
              article_thumbnail_url,
              "https://media.istockphoto.com/id/2174551157/photo/cyber-security-data-protection-business-technology-privacy-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=wUI3KXIgMqgob_LcEkVhnTl20f0VK-fiJLqBLywYBIU="
            )}"              
              width="256"
              height="256"
              style="--aspect-ratio: 1"
              alt=""
            />
          </div>

          <button class="explore-post-btn">Explore &amp; Post</button></a
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
  <tbody aria-labelledby="categories-only-category">
  <tr    
    data-notification-level="tracking"
    class="has-description has-logo"
  >
    ${tds}
  </tr>
</tbody>
</table>
</div></div></div>
`;
const getSubCategory = () => {
  const pathArr = //window.location.pathname.split(
    `https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles`.split(
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
  const categoriesList = (await categories()).categories;
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
(async () => {
  try {
    const urlParams = getSubCategory();
    const results = await getCategoryName(urlParams);
    if (results.software_name.includes("Generic")) {
      results.software_name = results.domain_name;
    }

    let filtered = await responseApi(results);
    console.log("filtered", filtered);

    let resultTds = ``;

    if (filtered?.length) {
      filtered.forEach((x) => {
        if (x.event_name) {
          resultTds += templateEvent(x);
        }
        if (x.version_name) {
          resultTds += templateBulletin(x);
        }
        if (x.article_title) {
          resultTds += templateArticle(x);
        }
      });
      const resultsToDisplay = resultHtml(resultTds);
      console.log(resultsToDisplay);
      setTimeout(() => {
        alert(document.querySelector("li[title='Articles']"));
        if (document.querySelector("li[title='Articles']")) {
          const html = resultsToDisplay;

          const elements = document.querySelectorAll(
            ".container.list-container div.row"
          );
          if (elements.length) {
            elements[elements.length - 1].innerHTML = html;
          }
        }
      }, 1000);
    } else {
      filtered = [
        {
          event_name: "The new Event",
          event_start_date: "2023-10-01",
          event_end_date: "2023-10-02",
          event_description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
          event_page_url:
            "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
          event_thumbnail_url:
            "https://media.istockphoto.com/id/2152960546/photo/young-woman-using-digital-tablet-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=ERw6vEbS6Hy_i0QFlu5HXjEFd1v98QdyKCg3lOcA-M4=",
        },
        {
          version_name: "The new Version",
          release_date: "2023-10-01",
          release_notes:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
          url: "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
          thumbnail_url:
            "https://media.istockphoto.com/id/2151954310/photo/shield-security-network-technology-wire-frame-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=dXCjIveEjelzAWqLkt3Hu6LXYhBSyH5vJAcCXhr06k8=",
        },
        {
          article_title: "The new Article",
          article_description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quod laborum ullam illum ducimus obcaecati eligendi officia excepturi aliquid officiis. Nam aperiam totam impedit ipsam unde tempora eum praesentium laborum!",
          article_author: "John Doe",
          article_date: "2023-10-01",
          article_url:
            "https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles",
          article_thumbnail_url:
            "https://media.istockphoto.com/id/2174551157/photo/cyber-security-data-protection-business-technology-privacy-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=wUI3KXIgMqgob_LcEkVhnTl20f0VK-fiJLqBLywYBIU=",
        },
      ];
      filtered.forEach((x) => {
        if (x.event_name) {
          resultTds += templateEvent(x);
        }
        if (x.version_name) {
          resultTds += templateBulletin(x);
        }
        if (x.article_title) {
          resultTds += templateArticle(x);
        }
      });
    }

    console.log("");
  } catch (error) {
    console.log("error", error);
  }
})();
