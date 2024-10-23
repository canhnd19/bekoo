<template>
  <div class="base-pagination flex justify-end">
    <div class="list-paging sm:w-full">
      <ElPagination
        v-model:current-page="pageIndex"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :total="props.query.totalElements"
        :pager-count="
          () => {
            return 5
          }
        "
        popper-class="select-pagination sm:flex sm:justify-end"
        background
        layout="sizes, prev, pager, next"
        @size-change="
          (size: number) => {
            pageIndex = 1
            emits('limit-change', size)
          }
        "
        @current-change="emits('page-change', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IQuery } from '@/types/query.type'

const pageSizes: number[] = [10, 20, 50, 100]
interface IProps {
  query?: IQuery
  label?: string
}
const props = withDefaults(defineProps<IProps>(), {
  query: () => ({
    pageIndex: 1,
    pageSize: 10,
    totalElements: 0
  }),
  label: ''
})

const emits = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'limit-change', limit: number): void
}>()

const pageSize = defineModel('pageSize', {
  default: 10,
  type: Number
})
const pageIndex = defineModel('pageIndex', {
  default: 1,
  type: Number
})
</script>

<style scoped lang="scss">
.base-pagination {
  padding: 12px 0;
  :deep(.list-paging) {
    .el-pagination__sizes {
      .el-select {
        .el-input {
          width: 114px;
          background: linear-gradient(107deg, rgba(255, 255, 255, 0.09) 3.44%, rgba(255, 255, 255, 0.04) 64.82%);

          &:hover {
            .el-input__wrapper {
              border-color: var(--active);
            }
          }
          .el-input__wrapper {
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            background: linear-gradient(107deg, rgba(255, 255, 255, 0.09) 3.44%, rgba(255, 255, 255, 0.04) 64.82%);
            backdrop-filter: blur(15px);
            box-shadow: none;
            .el-input__inner {
              height: 34px;
              color: var(--primary);
            }
          }
        }
        .el-input.is-focus {
          .el-input__wrapper {
            box-shadow: none !important;
          }
        }
      }
    }
    .btn-prev,
    .btn-next {
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      background: linear-gradient(107deg, rgba(255, 255, 255, 0.09) 3.44%, rgba(255, 255, 255, 0.04) 64.82%);
      backdrop-filter: blur(15px);
      box-shadow: none;
      &:hover {
        border-color: var(--active);
        i {
          color: var(--primary);
        }
      }
      i {
        width: 20px;
        font-size: 20px;
        color: var(--primary);
      }
    }
    .el-pager {
      .number {
        height: 32px;
        width: 32px;
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        background: linear-gradient(107deg, rgba(255, 255, 255, 0.09) 3.44%, rgba(255, 255, 255, 0.04) 64.82%);
        backdrop-filter: blur(15px);
        color: var(--primary);
        &:hover {
          border-color: var(--active);
          color: var(--active);
        }
      }
      .is-active {
        border-color: var(--active);
        color: var(--active);
      }
    }
  }
}
</style>
