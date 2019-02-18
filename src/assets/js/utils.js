export default {
    typeCodeToName(code) {
        return {
            1: '超级管理员',
            2: '农企',
            3: '检测机构',
            4: '仓储机构',
            5: '物流机构'
        }[code]
    }
}