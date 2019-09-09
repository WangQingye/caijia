const PageMixin = {
    data: () => {
        return {
            dataTotalLength: 1,
            pageLimit: 10,
            currentPage: 1
        }
    },
    methods: {
        pageChange(page) {
            console.log(11);
            this.getCodeList(page);
        },
        sizeChange(pageLimit) {
            this.pageLimit = pageLimit;
            this.getCodeList(this.currentPage);
        }
    },
}

export default PageMixin