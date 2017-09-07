 <template>
      <el-dropdown @command="onMenuClick">
        <span class="el-dropdown-link">
            <el-button :plain="true" type="info" size="small" :style="{ border: 0 }">
                <i class="fa fa-list"></i>
                <i class="fa fa-angle-down"></i>
            </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="menu in menuOptions" :key="menu.key" :command="menu.key">{{menu.name}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>  
</template>

<script>

    export default {
        props: {
            menuOptions: {
                type: Array,
                required: true
            },
        },

        methods: {
            onMenuClick(key){
                this.$emit('click', key)
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>