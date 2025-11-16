<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
	<div class="_spacer" style="--MI_SPACER-w: 700px;">
		<div v-if="roles != null && roles.length > 0" class="_spacer">
			<MkFoldableSection>
				<template #header>{{ i18n.ts._role.manual + " " + i18n.ts.roles }}</template>
		<div :class="$style.roleGrid">
			<MkRolePreview v-for="role in rolesManual" :key="role.id" :role="role" :forModeration="false"/>
		</div>
	</MkFoldableSection>
	<MkFoldableSection>
		<template #header>{{ i18n.ts._role.conditional + " " + i18n.ts.roles }}</template>
		<div :class="$style.roleGrid">
			<MkRolePreview v-for="role in rolesConditional" :key="role.id" :role="role" :forModeration="false"/>
		</div>
	</MkFoldableSection>
	<MkFoldableSection>
		<template #header>{{ i18n.ts.community + " " + i18n.ts.roles }}</template>
		<div :class="$style.roleGrid">
			<MkRolePreview v-for="role in rolesCommunity" :key="role.id" :role="role" :forModeration="false"/>
		</div>
			</MkFoldableSection>
		</div>
	<MkLoading v-else-if="loading" />
	<MkResult v-else type="empty" :text="i18n.ts.noRole"/>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import * as Misskey from 'misskey-js';
import MkRolePreview from '@/components/MkRolePreview.vue';
import { i18n } from '@/i18n.js';
import MkFoldableSection from '@/components/MkFoldableSection.vue';
import { i18n } from '@/i18n.js';
import { misskeyApi } from '@/utility/misskey-api.js';

const rolesManual = ref<Misskey.entities.Role[] | null>(null);
const rolesConditional = ref<Misskey.entities.Role[] | null>(null);
const rolesCommunity = ref<Misskey.entities.Role[] | null>(null);
const loading = ref(true);

misskeyApi('roles/list').then(res => {
	const roles = res.sort((a, b) => b.displayOrder - a.displayOrder);
}).finally(() => {
	loading.value = false;
	rolesManual.value = roles.filter(x => x.target === 'manual' && x.permissionGroup !== 'Community');
	rolesConditional.value = roles.filter(x => x.target === 'conditional' && x.permissionGroup !== 'Community');
	rolesCommunity.value = roles.filter(x => x.permissionGroup === 'Community');
});
</script>

<style lang="scss" module>
	.roleGrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		grid-gap: var(--margin);
	}
</style>

