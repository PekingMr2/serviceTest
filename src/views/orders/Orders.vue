<template>
	<section>
		<!--工具条-->
		<el-row class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="false" :model="filters" label-width="70px" class="searchForm">
				 <el-form-item label="资源名称" >
					<el-select v-model="interfaceParam" placeholder="请选择" style="width:100%;">
						<el-option 
							v-for="item in resourceList" 
							:key="item.value"
							:label="item.label"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号">
					<el-input v-model="filters.cardno" placeholder="请输入身份证号" auto-complete="on"></el-input>
				</el-form-item>
				<el-form-item class="searchBtn">
					<el-button type="primary"  @click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		 </el-row>
		<!--查询结果列表-->
		<transition name="fade">
			<el-table :data="list" transiton="fade" highlight-current-row v-loading="listLoading" v-if="isShow" style="width: 100%;" class="resultBox">
				<el-table-column :label="item.value" :prop="item.key" v-for="item in headerList" align="center" :key="item.key">
				</el-table-column>
			</el-table> 
        </transition>
		

		<!-- 对照列表  -->
		<div style="position:relative;overflow:hidden;margin-top:50px;">
			<strong style="display:block;color:#475669;padding:10px 0;font-size:16px;">参照列表</strong>
			<el-table :data="referenceList1"  style="width: 49.5%;display:inline-block;float:left;" class="resultBox" :row-class-name="tableRowClassName1">
				<el-table-column prop="range" label="工资范围" align="center" >
				</el-table-column>
				<el-table-column prop="scale" label="工资等级" align="center" >
				</el-table-column>
			</el-table>
			<el-table :data="referenceList2" style="width: 49.5%;display:inline-block;float:right;" class="resultBox" :row-class-name="tableRowClassName2">
				<el-table-column prop="range" label="工资范围" align="center" >
				</el-table-column>
				<el-table-column prop="scale" label="工资等级" align="center" >
				</el-table-column>
			</el-table>  
		</div>
	</section>
		
</template>

<script>
	import { getOrderList, cancelOrder, recoverOrder, cancelOrderAppointment } from '../../api/api';

	export default {
		components: {
		},
		data() {
			return {
				// 当前一级Tab
				currentFirstLevelTab: "0",
				// 当前二级Tab
				currentSecondLevelTab: "0",
				// 所有菜单项，status代表在哪些状态下显示该菜单

				//资源名称 下拉列表
				resourceList:[
					{
						value:'getCompanyAndTime',
						label:'获取单位名称及缴费起止时间',
						tableHeaderOfRerult:[
							{key:'aab004',value:'单位名称'},
							{key:'bab015',value:'缴费起始时间'},
							{key:'bab016',value:'缴费截止时间'},
						]
					},
					{
						value:'getCompanyName',
						label:'获取单位名称',
						tableHeaderOfRerult:[
							{key:'aab004',value:'单位名称'},
						]
					},
					{
						value:'getWageGrade',
						label:'社保缴费工资等级查询',
						tableHeaderOfRerult:[
							{key:'aac040',value:'工资等级'},
						]
					}
				],

				referenceList1:[
					{range:'	0', scale:'未知'},
					{range:'	0<工资<=1000', scale:'Aa'},
					{range:'	1000<工资<=2000', scale:'Ab'},
					{range:'	2000<工资<=3000', scale:'Ac'},
					{range:'	3000<工资<=4000', scale:'Ad'},
					{range:'	4000<工资<=5000', scale:'Ae'},
					{range:'	5000<工资<=6000', scale:'Af'},
					{range:'	6000<工资<=7000', scale:'Ag'},
					{range:'	7000<工资<=8000', scale:'Ah'},
					{range:'	8000<工资<=9000', scale:'Ai'},
					{range:'	9000<工资<=10000', scale:'Aj'},
					{range:'	10000<工资<=11000', scale:'Ba'},
					{range:'	11000<工资<=12000', scale:'Bb'},
					{range:'	12000<工资<=13000', scale:'Bc'},
					{range:'	13000<工资<=14000', scale:'Bd'},
					{range:'	14000<工资<=15000', scale:'Be'},
					{range:'	15000<工资<=16000', scale:'Bf'},
					{range:'	16000<工资<=17000', scale:'Bg'},
					{range:'	17000<工资<=18000', scale:'Bh'},
					{range:'	18000<工资<=19000', scale:'Bi'},
					{range:'	19000<工资<=20000', scale:'Bj'},
					{range:'	20000<工资<=22000', scale:'Ca'},
					{range:'	22000<工资<=24000', scale:'Cb'},
					{range:'	24000<工资<=26000', scale:'Cc'},
					{range:'	26000<工资<=28000', scale:'Cd'},
					{range:'	28000<工资<=30000', scale:'Ce'},
					{range:'	30000<工资<=32000', scale:'Cf'},
					{range:'	32000<工资<=34000', scale:'Cg'},
					{range:'	34000<工资<=36000', scale:'Ch'},
					{range:'	36000<工资<=38000', scale:'Ci'},
				],
				referenceList2:[
					{range:'	38000<工资<=40000', scale:'Cj'},
					{range:'	40000<工资<=42000', scale:'Ck'},
					{range:'	42000<工资<=44000', scale:'Cl'},
					{range:'	44000<工资<=46000', scale:'Cm'},
					{range:'	46000<工资<=48000', scale:'Cn'},
					{range:'	48000<工资<=50000', scale:'Co'},
					{range:'	50000<工资<=55000', scale:'Da'},
					{range:'	55000<工资<=60000', scale:'Db'},
					{range:'	60000<工资<=65000', scale:'Dc'},
					{range:'	65000<工资<=70000', scale:'Dd'},
					{range:'	70000<工资<=75000', scale:'De'},
					{range:'	75000<工资<=80000', scale:'Df'},
					{range:'	80000<工资<=85000', scale:'Dg'},
					{range:'	85000<工资<=90000', scale:'Dh'},
					{range:'	90000<工资<=95000', scale:'Di'},
					{range:'	95000<工资<=100000', scale:'Dj'},
					{range:'	10w<工资<=11w', scale:'Ea'},
					{range:'	11w<工资<=12w', scale:'Eb'},
					{range:'	12w<工资<=13w', scale:'Ec'},
					{range:'	13w<工资<=14w', scale:'Ed'},
					{range:'	14w<工资<=15w', scale:'Ee'},
					{range:'	15w<工资<=16w', scale:'Ef'},
					{range:'	16w<工资<=17w', scale:'Eg'},
					{range:'	17w<工资<=18w', scale:'Eh'},
					{range:'	18w<工资<=19w', scale:'Ei'},
					{range:'	19w<工资<=20w', scale:'Ej'},
					{range:'	20w<工资<=30w', scale:'F'},
					{range:'	30w<工资<=50w', scale:'G'},
					{range:'	50W以上', scale:'H'},
				],

				secondLevelTabs: [],
				
				//是否显示查询结果table
				isShow:false,

				// 筛选器
				filters: {
					cardno: '',
				},
				interfaceParam:'',
				// table数据
				list: [],
				// 搜索结果header
				headerList: [],
				// 正在获取数据，则显示loading
				listLoading: false,

				row1:-1,
				row2:-1,
			}
		}, 
		computed: {
			status: function(){
				return this.currentSecondLevelTab !== "0" ? (this.currentFirstLevelTab + "." + this.currentSecondLevelTab) : this.currentFirstLevelTab
			},
		},
		watch: {
			
		},
		methods: {

			//获取列表
			getList() {
				//清空原数据
				// this.list = [];

				this.isShow = true;

				let para = {
					...this.filters
				};
				if(!this.interfaceParam){
					this.getError('请选择资源名称');
					return false;
				}else if(!para.cardno){
					this.getError('请输入身份证号');
					return false;
				}


				//资源名称选择
				let that = this;
				this.resourceList.forEach(function(row){
					if(row.value==that.interfaceParam) that.headerList = row.tableHeaderOfRerult;
				});

				this.listLoading = true;

				getOrderList(para,this.interfaceParam).then((res) => {
					console.log(res)
					this.list = res.datas;
					this.listLoading = false;

					let newObj = this.list;
					if(newObj&&(newObj.length>0)&&newObj[0].aac040){
						this.getScale(newObj[0].aac040);
					}else{
						this.row1 = this.row2 = -1;
					}

				});
			},
			//错误提示
			getError(err) {
				this.$message({
					showClose: true,
					message: err,
					type: 'error'
				});
			},

			tableRowClassName1(row, index) {
				if (index === this.row1) {
					return 'info-row';
				} 
					return '';
			},
			tableRowClassName2(row, index) {
				if (index === this.row2) {
					return 'info-row';
				} 
					return '';
			},
			//判断当前等级
			getScale(currentScale){
				let that = this;
				this.referenceList1.forEach(function(obj,index){
					if(obj.scale===currentScale){
						that.row1 = index;
					}
				})
				this.referenceList2.forEach(function(obj,index){
					if(obj.scale===currentScale){
						that.row2 = index;
					}
				})
			},

			//等级匹配 当前行hightlight
			// setCurrent1(row) {
			// 	this.$refs.singleTable1.setCurrentRow(row);
			// },
			// setCurrent2(row) {
			// 	this.$refs.singleTable2.setCurrentRow(row);
			// },
			// handleCurrentChange(val) {
			// 	this.currentRow = val;
			// }

		},
		mounted() {
		}
	}

</script>

<style lang="css" >
.toolbar .el-form--inline .el-input{
	width: 220px;
}

.searchForm{width:60%;margin-left:5%;}
.searchForm .searchBtn .el-button{
	padding:9px 20px;
	letter-spacing:5px;
}
.el-table .info-row{
    background: #c9e5f5;
}
</style>