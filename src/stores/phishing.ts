import { defineStore } from 'pinia';
import { API } from '@/API/phishStats';

export const usePhishingStore = defineStore('phishing', {
  actions: {
    ADD_RULER(value: Phishing.Ruler) {
      const lastElem = lastElement(this.request);

      if (!lastElem || !('field' in lastElem)) {
        this.request.push(value);
      } else {
        console.warn('Cannot add new rule after another rule');
      }
    },
    ADD_JOINER(value: Phishing.Joiner) {
      const lastElem = lastElement(this.request);

      if (lastElem && 'field' in lastElem) {
        this.request.push(value);
      } else {
        console.warn(
          'Cannot add new joiner after another joiner or add a joiner to first position'
        );
      }
    },
    DELETE_ITEM(index: number) {
      this.request.splice(index, 1);
    },
    UPDATE_RULER(index: number, value: Phishing.Ruler) {
      const requestItem = this.request[index];

      if (requestItem && 'field' in requestItem) {
        this.request.splice(index, 1, value);
      } else {
        console.warn(`Cannot update rule at position ${index}`);
      }
    },
    UPDATE_JOINER(index: number, value: Phishing.Joiner) {
      const requestItem = this.request[index];

      if (requestItem && !('field' in requestItem)) {
        this.request.splice(index, 1, value);
      } else {
        console.warn(`Cannot update joiner at position ${index}`);
      }
    },
    async FETCH(additionalRules: { sort: keyof Phishing.Item; limit: number }) {
      const result: Phishing.Item[] = await API.getStats(
        this.request,
        additionalRules
      );

      this.results.list = result.map((item) => {
        delete item.screenshot;

        return item;
      });

      return result;
    },

    async RAW_FETCH(req: string) {
      const result = await API.getStatsByRawRequest(req);

      this.results.list = result;

      return result;
    },
  },
  state: () => ({
    request: [] as Phishing.Request,
    results: {
      list: [] as Phishing.Item[],
      error: '',
    },
  }),
  getters: {
    REQUEST: (
      state
    ): (
      | (Phishing.Ruler & { type: 'rule' })
      | (Phishing.Joiner & { type: 'joiner' })
    )[] => {
      return state.request.map((item) => {
        if ('field' in item)
          return {
            ...item,
            type: 'rule' as const,
          } as Phishing.Ruler & { type: 'rule' };

        return {
          ...item,
          type: 'joiner' as const,
        } as Phishing.Joiner & { type: 'joiner' };
      });
    },

    NEXT_ACTION(): 'add-rule' | 'add-joiner' {
      const last = lastElement(this.REQUEST);

      return last?.type === 'rule' ? 'add-joiner' : 'add-rule';
    },

    RESULTS: (state) => state.results,
  },
});

function lastElement<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
