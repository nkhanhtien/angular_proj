import { Injectable } from '@angular/core';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { GridRequestInfo } from '../base-core-ui/app.core.shared.interfaces';

@Injectable({
    providedIn: 'root',
})
export class KeycloakAdminService {
    private keycloakAdminClient = new KeycloakAdminClient({
        baseUrl: environment.keycloakConfig.url,
        realmName: environment.keycloakConfig.realm,
    });;
    private accessToken: string | undefined;
    constructor(private keycloakService: KeycloakService) {
    }

    async getAccessToken(): Promise<string> {
        if (!this.accessToken) {
            this.accessToken = await this.keycloakService.getToken();
        }
        return this.accessToken;
    }

    private async ensureAccessToken(): Promise<void> {
        if (!this.accessToken) {
            const accessToken = await this.getAccessToken();
            this.keycloakAdminClient.setAccessToken(accessToken);
        }
    }

    async getGroups(pageIndex?: number, pageSize?: number, sortName?: string, sortOrder?: string, searchQuery?: string): Promise<any[]> {
        try {
            await this.ensureAccessToken();
            let params: any;
            if (pageIndex !== undefined && pageSize !== undefined) {
                params = {
                    first: pageIndex * pageSize,
                    max: pageSize,
                };
            }

            if (sortName) {
                params.sort = sortName;
                params.reversed = sortOrder === 'desc';
            }

            if (searchQuery) {
                params.search = searchQuery;
            }

            const groups = await this.keycloakAdminClient.groups.find(params);
            return groups;
        } catch (error) {
            console.error('Error retrieving groups from Keycloak:', error);
            throw error;
        }
    }

    async createGroup(name: string): Promise<Object> {
        try {
            await this.ensureAccessToken();
            const groups = await this.keycloakAdminClient.groups.create({
                name: name,
            });
            return groups;
        } catch (error) {
            console.error('Error creating groups from Keycloak:', error);
            return 'The group name already exists';
        }
    }

    async updateGroup(groupId: string, name: string) {
        try {
            await this.ensureAccessToken();
            await this.keycloakAdminClient.groups.update(
                { id: groupId },
                { name: name }
            );
            return true;
        } catch (error) {
            console.error('Error updating groups from Keycloak:', error);
            return 'The group name already exists';
        }
    }

    async countGroup() {
        try {
            await this.ensureAccessToken();
            const result = await this.keycloakAdminClient.groups.count();
            return result;
        } catch (error) {
            console.error('Error counting groups from Keycloak:', error);
            throw error;
        }
    }

    async delGroup(groupId: string): Promise<boolean> {
        try {
            await this.ensureAccessToken();
            await this.keycloakAdminClient.groups.del({ id: groupId! });
            return true;
        } catch (error) {
            console.error('Error deleting groups from Keycloak:', error);
            throw error;
        }
    }
    
    async getRoles(pageIndex?: number, pageSize?: number, sortName?: string, sortOrder?: string, searchQuery?: string): Promise<any[]> {
        try {
            await this.ensureAccessToken();
            let params: any;
            if (pageIndex !== undefined && pageSize !== undefined) {
                params = {
                    first: pageIndex * pageSize,
                    max: pageSize,
                };
            }

            if (sortName) {
                params.sort = sortName;
                params.reversed = sortOrder === 'desc';
            }

            if (searchQuery) {
                params.search = searchQuery;
            }

            const roles = await this.keycloakAdminClient.roles.find(params);
            return roles;
        } catch (error) {
            console.error('Error retrieving roles from Keycloak:', error);
            throw error;
        }
    }

    async createRole(name: string, description?: string): Promise<Object> {
        try {
            await this.ensureAccessToken();
            const roles = await this.keycloakAdminClient.roles.create({
                name: name,
                description: description
            });
            return roles;
        } catch (error) {
            console.error('Error creating roles from Keycloak:', error);
            return 'The role name already exists';
        }
    }

    async updateRole(roleId: string, name: string, description?: string) {
        try {
            await this.ensureAccessToken();
            await this.keycloakAdminClient.roles.updateById(
                { id: roleId },
                {
                    name: name,
                    description: description
                }
            );
            return true;
        } catch (error) {
            console.error('Error updating roles from Keycloak:', error);
            return 'The role name already exists';
        }
    }

    async countRole() {
        try {
            await this.ensureAccessToken();
            const result = await this.keycloakAdminClient.roles.find();
            return { count: result.length };
        } catch (error) {
            console.error('Error counting role from Keycloak:', error);
            throw error;
        }
    }

    async delRole(roleId: string): Promise<boolean> {
        try {
            await this.ensureAccessToken();
            await this.keycloakAdminClient.roles.delById({ id: roleId! });
            return true;
        } catch (error) {
            console.error('Error deleting role from Keycloak:', error);
            throw error;
        }
    }

    async getUsers(gridInfo: GridRequestInfo, roleName: string) {
        try {
            await this.ensureAccessToken();
            const { PageIndex, PageSize, SortName, SortDesc } = gridInfo;
            const allUsers = await this.keycloakAdminClient.users.find();
            const usersWithRole: UserRepresentation[] = [];

            for (const user of allUsers) {
                const userRoles = await this.keycloakAdminClient.users.listRealmRoleMappings({
                    id: user.id as string
                });
                if (userRoles.some(userRole => userRole.name === roleName || (roleName === 'Admin' && userRole.name ==='Super Admin'))) {
                    usersWithRole.push(user);
                }
            }

            // Sorting
            if (SortName) {
                usersWithRole.sort((a, b) => {
                    const fieldA = a[SortName];
                    const fieldB = b[SortName];
                
                    if (fieldA < fieldB) {
                        return SortDesc === 'asc' ? -1 : 1;
                    }
                    if (fieldA > fieldB) {
                        return SortDesc === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            // Paging
            if (PageIndex !== undefined && PageSize !== undefined) {
                const startIndex = PageIndex * PageSize;
                const endIndex = startIndex + PageSize;
                const paginatedUsers = usersWithRole.slice(startIndex, endIndex);

                return {
                    users: paginatedUsers,
                    total: usersWithRole.length
                };
            }

            return {
                users: usersWithRole,
                total: usersWithRole.length
            };
        } catch (error) {
            console.error('Error get users from Keycloak:', error);
            throw error;
        }
    }

    async getUsersByRealmRole(gridInfo: GridRequestInfo, roleName: string) {
        try {
            await this.ensureAccessToken();
            const { PageIndex, PageSize } = gridInfo;
            let params: any = {};
            if (PageIndex !== undefined && PageSize !== undefined) {
                params = {
                    first: PageIndex * PageSize,
                    max: PageSize,
                };
            }

            if (roleName) {
                params.name = roleName
            }
            const users = await this.keycloakAdminClient.roles.findUsersWithRole(params)
            return users;
        } catch (error) {
            console.error('Error get users by realm role from Keycloak:', error);
            throw error;
        }
    }

    async countUserByRealmRole(roleName: string) {
        try {
            await this.ensureAccessToken();

            const users = await this.keycloakAdminClient.roles.findUsersWithRole({
                name: roleName
            })
            return users.length;
        } catch (error) {
            console.error('Error count users from Keycloak:', error);
            throw error;
        }
    }

    async createUser(data: UserRepresentation) {
        try {
            await this.ensureAccessToken();
            const newUser = await this.keycloakAdminClient.users.create(data);

            return newUser;
        } catch (error) {
            console.error('Error creating user from Keycloak:', error);
            return false;
        }
        
    }

    async assignUserToRole(userId: string, roleNames: string[]) {
        try {
            await this.ensureAccessToken();

            const roles = await this.keycloakAdminClient.roles.find();

            const roleMappings: RoleMappingPayload[] = roles
                .filter((role) => role.name && roleNames.includes(role.name))
                .map((role) => ({
                    id: role.id || '',
                    name: role.name || '',
                }));

            await this.keycloakAdminClient.users.addRealmRoleMappings({
                id: userId, 
                roles: roleMappings, 
            });

        } catch (error) {
            console.error('Error assign user to role from Keycloak:', error);
            throw error;
        }
    }

    async getUserById(userId: string) {
        try {
            await this.ensureAccessToken();
            const user = await this.keycloakAdminClient.users.findOne({
                id: userId,
            });
            return user;
        } catch (error) {
            console.error('Error get user by id from Keycloak:', error);
            throw error;
        }
    }

    async updateUser(userId: string, userData: UserRepresentation) {
        try {
            await this.ensureAccessToken();
            await this.keycloakAdminClient.users.update({
                id: userId
            }, userData)
            return true;
        } catch (error) {
            console.error('Error updating user from Keycloak:', error);
            return false;
        }
    }

    async updateUserGroups(userId: string, groups: string[]) {
        try {
            await this.ensureAccessToken();
            // Get all groups
            const groupList = await this.keycloakAdminClient.groups.find();
            // Get all user groups
            const existingGroups = await this.keycloakAdminClient.users.listGroups({
                id: userId
            });

            // Remove users from groups that are no longer on the new groups
            await Promise.all(
                existingGroups
                    .filter(group => !groups.includes(group.name as string))
                    .map(group => this.keycloakAdminClient.users.delFromGroup({
                        id: userId,
                        groupId: group.id as string,
                    }))
            );

            // Add user to new groups
            const addGroups = groups.filter(group => !existingGroups.some(item => item.name === group));
            const addGroupList = groupList.filter(group => addGroups.includes(group.name as string));
            await Promise.all(
                addGroupList.map(group => this.keycloakAdminClient.users.addToGroup({
                    id: userId,
                    groupId: group.id as string
                }))
            )

            return true;
        } catch (error) {
            console.error('Error updating user groups from Keycloak:', error);
            return false;
        }
    }

    async updateUserRoles(userId: string, roles: string[]) {
        try {
            await this.ensureAccessToken();
            // Get all roles
            const roleList = await this.keycloakAdminClient.roles.find();
            // Get all user roles
            const existingRoles = await this.keycloakAdminClient.users.listRealmRoleMappings({id : userId});

            // Unassign users from roles that are no longer on the new role
            const deletedRoles: RoleMappingPayload[] = existingRoles
                .filter(role => !roles.includes(role.name as string))
                .map(role => ({
                    id: role.id as string,
                    name: role.name as string
                }));
            await this.keycloakAdminClient.users.delRealmRoleMappings({
                id: userId,
                roles: deletedRoles
            });

            // Assign user to new roles
            const assingedRoles = roles.filter(role => !existingRoles.some(item => item.name === role));
            const assingedRoleList: RoleMappingPayload[] = roleList
                .filter(role => assingedRoles.includes(role.name as string))
                .map(role => ({
                    id: role.id as string,
                    name: role.name as string
                }))
            await this.keycloakAdminClient.users.addRealmRoleMappings({
                id: userId,
                roles: assingedRoleList
            })

            return true;
        } catch (error) {
            console.error('Error updating user roles from Keycloak:', error);
            return false;
        }
    }

    async getUserGroups(userId: string) {
        try {
            await this.ensureAccessToken();
            const groups = await this.keycloakAdminClient.users.listGroups({
                id: userId
            })
            return groups;
        } catch (error) {
            console.error('Error get user groups from Keycloak:', error);
            throw error;
        }
    }

    async getUserRoles(userId: string) {
        try {
            await this.ensureAccessToken();
            const roles = await this.keycloakAdminClient.users.listRealmRoleMappings({
                id: userId
            })
            return roles;
        } catch (error) {
            console.error('Error get user roles from Keycloak:', error);
            throw error;
        }
    }

    async changePassword(userInfo, oldPassword, password) {
        try {
            await this.keycloakAdminClient.auth({
                clientId: environment.keycloakConfig.clientId,
                grantType: 'password',
                username: userInfo.username,
                password: oldPassword,
            });

            await this.keycloakAdminClient.users.resetPassword({
                id: userInfo.id,
                credential: {
                    type: 'password',
                    value: password,
                }
            });
            return true;
        } catch (error) {
            console.error('Error change password from Keycloak:', error);
            return false;
        }
    }
}
