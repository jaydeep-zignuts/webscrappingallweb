const rules= {
    CARD_URL_RULE: "body > div.page-wrap > section > div > div > div.content.listing--content > div.listing--wrapper > div.listing--container > div > div > div > div.product--info > a.product--image",
    BIKE_SPEC_CLICK : "body > div.page-wrap > section > div > div > div > div.content--no-tab-view2 > div.fullwi > div.tabPanel-widget > label:nth-child(5)",
    BIKE_CARD:"body > main > div > div > div > section > div > div > div > div > div.teaser-item--inner",
    //BIKE Frame Details
    BIKE_FRAME_DETAILS: "body > div.page-wrap > section > div > div > div > div.content--no-tab-view2 > div.fullwi > div.tabPanel-widget > div:nth-child(8) > div > div > table > tbody > tr",
    BIKE_HEADINGS: "body > div.page-wrap > section > div > div > div > div.content--no-tab-view2 > div.fullwi > div.tabPanel-widget > div:nth-child(8) > div > div > table > tbody > tr > td:nth-child(1)",
    BIKE_DESCRIPTION: "body > div.page-wrap > section > div > div > div > div.content--no-tab-view2 > div.fullwi > div.tabPanel-widget > div:nth-child(8) > div > div > table > tbody > tr > td:nth-child(2)",

    // BIKE MAIN DETAILS
    BIKE_MODEL:"body > div.page-wrap > section > div > div > div > div.content--background > div > div.product--buybox.block > h1",
    BIKE_PRICE:"body > div.page-wrap > section > div > div > div > div.content--background > div > div.product--buybox.block > div.buybox--inner > div.product--price.price--default.price--discount > span.price--content.content--default",
    BIKE_IMAGE:"body > div.page-wrap > section > div > div > div > div.content--background > div > div.product--image-container.image-slider.product--image-zoom > div.image-slider--container > div > div:nth-child(1) > span > span > img",
}   

module.exports={ rules }


