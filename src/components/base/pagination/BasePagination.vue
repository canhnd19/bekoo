<template>
  <div class="base-pagination">
    <div class="flex items-center justify-between">
      <div v-if="isDesktop" class="text-sm text-secondary">
        Show
        {{ useFormatNumber(props.query.totalPage == 0 ? 0 : (props.query.pageIndex - 1) * props.query.pageSize + 1) }}
        -
        {{
          useFormatNumber(
            props.query.pageIndex * props.query.pageSize > props.query.totalPage
              ? props.query.totalPage
              : props.query.pageIndex * props.query.pageSize
          )
        }}
        /
        {{ useFormatNumber(props.query.totalPage) }} {{ query.totalPage < 2 ? label : pluralize(label) }}
      </div>
      <div class="list-paging sm:w-full" :class="{ mobile: !isDesktop }">
        <div v-if="!isDesktop" class="option-list">
          <BaseSelect
            v-model:model-value="pageSize"
            :placeholder="String(props.query.pageSize)"
            class="!w-[80px] opacity-100"
            @change="limitChangeHandle"
          >
            <ElOption v-for="item in pageSizes" :key="item" :value="item"></ElOption>
          </BaseSelect>
        </div>
        <ElPagination
          v-model:current-page="pageIndex"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          :total="props.query.totalPage"
          :pager-count="
            (() => {
              if (isDesktop) return 5
              else return 3
            })()
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
  </div>
</template>

<script setup lang="ts">
import type { IQuery } from '@/types/query.type'

import useFormatNumber from '@/composables/useFormatNumber'

import { useBaseStore } from '@/stores/base'

const { isDesktop } = storeToRefs(useBaseStore())
const pageSizes: number[] = [10, 20, 50, 100]
interface IProps {
  query?: IQuery
  label?: string
}
const props = withDefaults(defineProps<IProps>(), {
  query: () => ({
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0
  }),
  label: ''
})
const limitChangeHandle = (i: number) => {
  emits('limit-change', i)
}
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
          // .el-input__wrapper.is-focus,
          // .el-input__wrapper.is-focus + .el-input-group__append {
          //   border-color: var(--dr-border-hover);
          //   box-shadow: none !important;
          // }
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
  .list-paging.mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    .option-list {
      height: 32px;
      width: 63px;
      :deep(.base-select) {
        max-height: 32px;
        width: 63px !important;
        .el-select {
          height: 32px;
          .el-input {
            height: 32px;
            .el-input__wrapper {
              justify-content: space-evenly;
              align-items: center;
              padding: 0 12px;
              .el-input__inner {
                width: 22px;
              }
              .el-input__suffix {
                margin: 0;
                .el-select__caret {
                  margin: 0;
                }
              }
            }
          }
        }
      }
    }
    :deep(.el-pagination) {
      button {
        height: 32px;
        width: 32px;
        margin: 0 8px;
        * {
          width: 16px;
          font-size: 16px;
        }
      }
      .el-pager {
        * {
          height: 32px;
          width: 32px;
        }
      }
      .el-pagination__sizes {
        display: none;
      }
    }
  }
}
</style>
