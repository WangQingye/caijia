const PageMixin = {
    data: () => {
        return {
            dataTotalLength: 1,
            pageLimit: 5
        }
    },
    methods: {
        pageChange(page){
            this.getCodeList(page);
        }
    },
}

export default PageMixin