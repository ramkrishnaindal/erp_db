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
  const response = await fetch("/site.json");

  // Check if the response is successful
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse the JSON response
  const result = await response.json();
  console.log("Response from server:", result);
  return result;
};
const templateEvent = ({
  event_name,
  event_start_date,
  event_end_date,
  event_description,
  event_page_url,
  event_thumbnail_url,
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
              src="${event_thumbnail_url}"
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
  version_name,
  release_date,
  release_notes,
  description,
  url,
  thumbnail_url,
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
              src="${thumbnail_url}"
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
    </td></tr>
  `;
const templateArticle = ({
  article_title,
  article_description,
  article_author,
  article_date,
  article_url,
  article_thumbnail_url,
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
              src="${article_thumbnail_url}"
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
  const pathArr = window.location.pathname.split(
    //`https://easihub.com/tags/c/plm-product-lifecycle-management/generic-plm-topics/1581/articles`.split(
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

    const filtered = await responseApi(results);
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
    }

    console.log("");
  } catch (error) {
    console.log("error", error);
  }
})();
