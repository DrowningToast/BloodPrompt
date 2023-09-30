import prisma, { Prisma } from '..';

export const announcementsController = {
	getAnnouncements: async (filter?: Prisma.AnnouncementsWhereInput) => {
		const announcements = await prisma.announcements.findMany({
			where: filter
		});
		return announcements;
	}
};
