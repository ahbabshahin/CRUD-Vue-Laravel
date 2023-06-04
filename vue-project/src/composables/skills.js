import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';

export default function useSkills() {
	const skills = ref([]);
	const skill = ref([]);
	const errors = ref({});
	const router = useRouter();

	const getSkills = async () => {
		const res = await axios.get('skills');
		skills.value = res.data.data;
	};

	const getSkill = async (id) => {
		const res = await axios.get('skills/' + id);
		skill.value = res.data.data;
	};

	const storeSkill = async (data) => {
		try {
			await axios.post('skills', data);
			await router.push({ name: 'SkillIndex' });
		} catch (error) {
			if (error.response.status === 422) {
				errors.value = error.response.data.errors;
			}
		}
	};

	const updateSkill = async (id) => {
		try {
			await axios.put('skills/' + id, skill.value);
			await router.push({ name: 'SkillIndex' });
		} catch (error) {
			if (error.response.status === 422) {
				errors.value = error.response.data.errors;
			}
		}
	};

	const destroySkill = async (id) => {
		if (!window.confirm('Are you Sure?')) return;
		await axios.delete('skills/' + id);
		getSkills();
		await router.push({ name: 'SkillIndex' });
	};

	return {
		skill,
		skills,
		getSkills,
		getSkill,
		storeSkill,
		updateSkill,
		destroySkill,
		errors,
	};
}
