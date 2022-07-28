import axios from 'axios';
import { wrapper } from "../utils/wrapper";
import { API_URL } from '../config';

export default class ApiService {
  async getAPIs(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/apis?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/apis`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getAPIById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/apis/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newAPI(body: any) {
    const route = `${API_URL}/apis`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async updateAPI(id: number, body: any) {
    const route = `${API_URL}/apis/${id}`;

    const response = await wrapper(
      axios.patch(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delAPI(id: number) {
    const route = `${API_URL}/apis/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getMethods(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/methods?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/methods`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getMethodById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/methods/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newMethod(body: any) {
    const route = `${API_URL}/methods`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async updateMethod(id: number, body: any) {
    const route = `${API_URL}/methods/${id}`;

    const response = await wrapper(
      axios.patch(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delMethod(id: number) {
    const route = `${API_URL}/methods/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTestgroups(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/test-groups?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/test-groups`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async runTestgroup(groupId: number) {
    let route = `${API_URL}/test-groups/${groupId}/run`;

    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTestgroupById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/test-groups/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newTestgroup(body: any) {
    const route = `${API_URL}/test-groups`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async updateTestgroup(id: number, body: any) {
    const route = `${API_URL}/test-groups/${id}`;

    const response = await wrapper(
      axios.patch(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delTestgroup(id: number) {
    const route = `${API_URL}/test-groups/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTests(filter?: any) {
    let route: string = "";

    if (filter) {
      route = `${API_URL}/tests?where=${encodeURI(JSON.stringify(filter))}`;
    } else {
      route = `${API_URL}/tests`;
    }
    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async runTest(testid: number) {
    let route = `${API_URL}/tests/${testid}/run`;

    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getTestById(id: number) {
    const response = await wrapper(
      axios.get(`${API_URL}/tests/${id}`)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async newTest(body: any) {
    const route = `${API_URL}/tests`;

    const response = await wrapper(
      axios.post(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async updateTest(id: number, body: any) {
    const route = `${API_URL}/tests/${id}`;

    const response = await wrapper(
      axios.patch(route, body)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async delTest(id: number) {
    const route = `${API_URL}/tests/${id}`;

    const response = await wrapper(
      axios.delete(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async getGroupLatestResults(id: number, filter?: any) {
    const route = `${API_URL}/test-groups/${id}/latest-results`;

    const response = await wrapper(
      axios.get(route)
    );

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }

  async sendFile(id: number, data: FormData) {
    const route = `${API_URL}/apis/${id}/json`;

    const response = await wrapper(axios.post(route,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ));

    if (response.error) {
      throw response.error;
    }
    if (response.data) {
      return response.data.data;
    }
  }
}