<template>
  <div class="base-table">
    <template v-if="query.loading">
      <BaseLoading />
    </template>
    <ElTable
      v-else
      ref="table"
      class="custom-table"
      :empty-text="emptyText"
      :data="data"
      row-key="id"
      :show-header="showHeader"
      :row-class-name="rowClassName"
      :tree-props="treeProps"
      :load="load"
      :lazy="lazy"
      @row-click="handleRowClick"
      @select="handleSelectionChange"
      @select-all="handleSelectionAll"
      @cell-click="handleCellClick"
      @expand-change="(row: T, expandedRows: T[]) => emits('expand-change', row, expandedRows)"
    >
      <template #append>
        <slot name="append"></slot>
      </template>
      <template v-if="!data.length" #empty>
        <BaseEmpty />
      </template>
      <slot />
    </ElTable>
    <BasePagination
      v-if="showPagination && props.data.length && !props.loading"
      v-model:page-index="pageIndex"
      v-model:page-size="pageSize"
      :query="query"
      :label="label"
      @limit-change="emits('limit-change', $event)"
      @page-change="emits('page-change', $event)"
    />
  </div>
</template>

<script setup lang="ts" generic="T">
import type { ElTable, TreeNode } from 'element-plus'

import type { IQuery } from '@/types/query.type'

interface ITable<T> {
  loading?: boolean
  emptyText?: string
  data: T[]
  query?: IQuery
  label?: string
  showPagination?: boolean
  showHeader?: boolean
  treeProps?: { hasChildren?: string; children?: string; checkStrictly?: boolean }
  lazy?: boolean
  load?: (row: any, treeNode: TreeNode, resolve: (data: T[]) => void) => void
}

interface IProp extends ITable<T> {
  rowClassName?: (value: any) => any
}

const props = withDefaults(defineProps<IProp>(), {
  loading: false,
  emptyText: 'There are no data',
  data: () => [],
  label: '',
  showPagination: true,
  query: () => ({ pageIndex: 1, pageSize: 10, totalElements: 0 }),
  rowClassName: () => ({}),
  showHeader: true,
  treeProps: () => ({}),
  lazy: false,
  load: () => ({})
})

const pageIndex = defineModel('pageIndex', {
  default: 1,
  type: Number
})
const pageSize = defineModel('pageSize', {
  default: 10,
  type: Number
})

const rowSelected = ref<T[]>([]) as Ref<T[]>
const table = ref<InstanceType<typeof ElTable> | null>(null)
defineExpose({ rowSelected, table })

const emits = defineEmits<{
  'page-change': [page: number]
  'limit-change': [limit: number]
  'row-click': [row: T]
  'cell-click': [index: number]
  'selection-change': [value: T[]]
  'expand-change': [row: T, expandedRows: T[]]
}>()

const handleRowClick = (row: T) => {
  emits('row-click', row)
}

const handleCellClick = (_row: T, column: Record<string, any>) => {
  emits('cell-click', column.no)
}

const handleSelectionChange = (val: T[]) => {
  rowSelected.value = [...val]
  emits('selection-change', rowSelected.value)
}

const handleSelectionAll = (val: T[]) => {
  if (val.length) {
    rowSelected.value = [...val]
  } else {
    rowSelected.value = []
  }

  emits('selection-change', val)
}
</script>

<style scoped lang="scss">
.base-table {
  :deep(.custom-table) {
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: transparent;
    --el-table-border-color: var(--border-table);
    --el-table-border: 1px solid var(--border-table);
    --el-table-row-hover-bg-color: #ffffff;
    background-color: transparent;
    .el-table__header-wrapper {
      .el-table__header {
        .el-table__cell {
          height: 46px;
          color: var(--secondary);
          text-transform: uppercase;
          font-weight: 600;
          font-size: 16px;
          .cell {
            text-wrap: nowrap;
          }
        }
      }
    }
    .el-table__body-wrapper {
      .el-scrollbar {
        .el-scrollbar__view {
          display: flex !important;
          flex-direction: column-reverse;
        }
        .el-table__body {
          .el-table__row {
            cursor: pointer;
            .el-table__cell {
              height: 52px;
              color: var(--secondary);
              font-size: 16px;
              .cell {
                word-break: break-word;
              }
            }
            .is-center {
              .cell {
                display: flex;
                justify-content: center;
              }
            }
          }

          .el-table__expand-icon {
            font-size: 16px;
            height: 16px;
            width: 16px;
            i {
              font-size: 20px;
              color: var(--secondary);
            }
          }
        }
      }
    }
    .el-table__expanded-cell {
      background: transparent;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}
</style>
